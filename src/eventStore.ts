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

export interface ReactEvent extends Event {
	event_type: "react";
	piece_id: string;
	user_uid: string;
	reaction: "like" | "dislike";
}

export interface PieceWithMeta {
	piece: PublishedEvent;
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

export const getRelevantPiece = async (
	category: PieceCategory | null
): Promise<PieceWithMeta> => {
	const eventsRef = firebase.firestore().collection("events");
	const publishedEventsQuery = await eventsRef
		.where("event_type", "==", "publish")
		.where("category", "==", category) // can be null so not good enough
		.get();
	if (publishedEventsQuery.empty) {
		console.log("No publish events.");
	}
	const publishedEvents: PublishedEvent[] = [];
	publishedEventsQuery.forEach(function (ev) {
		publishedEvents.push(({
			id: ev.id,
			...ev.data(),
		} as unknown) as PublishedEvent);
	});

	const curUserUid = firebase.auth().currentUser
		? firebase.auth().currentUser?.uid
		: null;
	const userViewEvents: any[] = [];

	if (curUserUid) {
		const userViewEventsQuery = await eventsRef
			.where("event_type", "==", "view")
			.where("user_uid", "==", curUserUid)
			.get();

		userViewEventsQuery.forEach(function (ev) {
			userViewEvents.push({ id: ev.id, ...ev.data() });
		});
	}

	const unseenPublishEvents = curUserUid
		? publishedEvents.filter(
				(ev) =>
					!userViewEvents.map((view) => view.piece_id).includes(ev.id)
		  )
		: [];

	let event: PublishedEvent;
	let noNewEvents: boolean;
	if (unseenPublishEvents.length === 0) {
		// random event
		console.log("no new events, so seeing something stale");
		event =
			publishedEvents[Math.floor(Math.random() * publishedEvents.length)];
		noNewEvents = true;
	} else {
		// random unseen event
		console.log("seeing a new event");
		console.log(unseenPublishEvents);
		event = unseenPublishEvents[0];
		if (curUserUid) {
			const viewEvent: ViewEvent = {
				event_type: "view",
				piece_id: event.id,
				user_uid: curUserUid,
			};
			logEvent(viewEvent);
		}
		noNewEvents = false;
	}
	console.log("whoohaa here is an event: ", event);
	return {
		piece: {
			title: event.title, // todo: desparately need to cleanup frontend components to match what is in firebase
			link: event.link,
			why: event.why,
			id: event.id,
			category: event.category,
			event_type: "publish",
			author_uid: event.author_uid,
		},
		noNewEvents: noNewEvents,
	};
};
