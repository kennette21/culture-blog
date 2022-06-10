import firebase from "./firebase";

export enum PieceCategory {
	look = "look",
	listen = "listen",
	watch = "watch",
	do = "do",
	read = "read",
}

export interface Event {
	// todo: event should have an id, generate the ID here and store that.
	event_type: "view" | "publish" | "react";
}

type EventsRef = firebase.firestore.CollectionReference<
	firebase.firestore.DocumentData
>;

export interface PublishEvent extends Event {
	event_type: "publish";
	link: string;
	title: string;
	why: string;
	category: PieceCategory | null;
	author_uid: string;
}

export interface PublishedEvent extends PublishEvent {
	id: string;
}

export interface ViewEvent extends Event {
	event_type: "view";
	piece_id: string;
	user_uid: string;
}

export interface ViewedEvent extends ViewEvent {
	id: string;
}

export interface ReactEvent extends Event {
	event_type: "react";
	piece_id: string;
	user_uid: string;
	reaction: "like" | "dislike";
	// emotion -- extra more decserning emotional classification (of the 6-8 core emotions) could show up as a popup after initial reaction
}

export type Piece = {
	event: PublishedEvent;
	contentHtml: any;
};

export interface PieceWithMeta {
	piece: Piece;
	noNewEvents: boolean;
}

// commands ---------

export const logEvent = async (event: Event) => {
	return firebase
		.firestore()
		.collection("events")
		.add(event)
		.then((docRef) => {
			docRef
				.update({
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				})
				.catch(() =>
					console.log(
						"trouble updating timestamp of docRef with id: " +
							docRef.id
					)
				);
			console.log("successfully logged event " + JSON.stringify(event));
		})
		.catch(() => console.log("failed to log event"));
};

// queries ---------

const getPublishedEvents = async (
	eventsRef: EventsRef,
	category: PieceCategory | null
): Promise<PublishedEvent[]> => {
	let query = eventsRef.where("event_type", "==", "publish");
	query = category ? query.where("category", "==", category) : query;
	const events = await query.get();
	if (events.empty) {
		console.log("No publish pieces.");
	}

	const publishedEvents: PublishedEvent[] = [];
	events.forEach(function (ev) {
		publishedEvents.push(({
			id: ev.id,
			...ev.data(),
		} as unknown) as PublishedEvent); // todo: fix gross typescript hack (might be the only way to map FireStore to Typescript)
	});
	return publishedEvents;
};

const getUserViewedEvents = async (
	eventsRef: EventsRef,
	userUid: string
): Promise<ViewedEvent[]> => {
	const userViewedEvents: ViewedEvent[] = [];
	const userViewEventsQuery = await eventsRef
		.where("event_type", "==", "view")
		.where("user_uid", "==", userUid)
		.get();

	userViewEventsQuery.forEach(function (ev) {
		userViewedEvents.push(({
			id: ev.id,
			...ev.data(),
		} as unknown) as ViewedEvent); // todo: fix gross typescript hack
	});
	return userViewedEvents;
};

const getRandom = <T>(list: T[]): T => {
	return list[Math.floor(Math.random() * list.length)];
};

const createPieceWithMeta = async (
	event: PublishedEvent,
	noNewEvents: boolean
): Promise<PieceWithMeta> => {
	const getIframelyPieceHtml = async (url: string) => {
		const resp = await (
			await fetch(
				"https://iframe.ly/api/iframely?url=" +
					url +
					"&api_key=532610e8a5ae3742540e3a&iframe=1&omit_script=1"
			)
		).json(); // TODO: extract api key
		// TODO: some error handling if iframely does not like url, just return some simple html ancor for link
		return resp.html;
	};

	return {
		piece: {
			contentHtml: await getIframelyPieceHtml(event.link),
			event: {
				id: event.id,
				title: event.title, // todo: desparately need to cleanup frontend components to match what is in firebase
				link: event.link,
				why: event.why,
				category: event.category,
				event_type: "publish",
				author_uid: event.author_uid,
			},
		},
		noNewEvents,
	};
};

export const getRelevantPiece = async (
	category: PieceCategory | null,
	userUid: string | null
): Promise<PieceWithMeta> => {
	const eventsRef = firebase.firestore().collection("events");
	const publishedEvents = await getPublishedEvents(eventsRef, category);

	let event: PublishedEvent = getRandom(publishedEvents);
	let noNewEvents: boolean = false;
	let eventsToPickFrom: PublishedEvent[] = publishedEvents;

	if (userUid) {
		const userViewedEvents = await getUserViewedEvents(eventsRef, userUid);
		const unseenPublishEvents = publishedEvents.filter(
			(ev) =>
				!userViewedEvents.map((view) => view.piece_id).includes(ev.id)
		);
		if (unseenPublishEvents.length === 0) {
			noNewEvents = true;
			// todo: logic for when a user has already seen everythign... maybe show them liked events before unliked?
		} else {
			eventsToPickFrom = unseenPublishEvents;
			event = getRandom(eventsToPickFrom);
			const viewEvent: ViewEvent = {
				event_type: "view",
				piece_id: event.id,
				user_uid: userUid,
			};
			logEvent(viewEvent);
		}
	}

	return await createPieceWithMeta(event, noNewEvents);
};
