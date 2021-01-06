import firebase from "./firebase";

export interface PieceWithMeta {
    piece: PublishedEvent;
    noNewEvents: boolean;
}

export interface Event {
    event_name: "view" | "publish";
}

export enum PieceCategory {
    look = "look",
    listen = "listen",
    watch = "watch",
    do = "do",
    read = "read",
}

export interface PublishEvent extends Event {
    event_name: "publish";
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
    event_name: "view";
    pieceId: string;
    viewerUserUid: string;
}

// commands

export const publishPiece = async (
    userUid: string,
    publishEvent: PublishEvent
) => {
    return firebase.firestore().collection("events").add(publishEvent);
};

export const logViewEvent = async (pieceId: string, viewerUserUid: string) => {
    const viewEventLog = {
        event_type: "view",
        piece_id: pieceId,
        user_uid: viewerUserUid,
    };
    firebase
        .firestore()
        .collection("events")
        .add(viewEventLog)
        .then(() => console.log("successfully created view"))
        .catch(() => console.log("failed to log view"));
};

// queries

export const getRelevantPiece = async (): Promise<PieceWithMeta> => {
    const eventsRef = firebase.firestore().collection("events");
    const publishEventsQuery = await eventsRef
        .where("event_type", "==", "publish")
        .get();
    if (publishEventsQuery.empty) {
        console.log("No publish events.");
    }
    const publishEvents: PublishedEvent[] = [];
    publishEventsQuery.forEach(function (ev) {
        publishEvents.push(({
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
        ? publishEvents.filter(
              (ev) =>
                  !userViewEvents.map((view) => view.piece_id).includes(ev.id)
          )
        : [];

    if (unseenPublishEvents.length === 0) {
        // random event
        const event =
            publishEvents[Math.floor(Math.random() * publishEvents.length)];
        return {
            piece: {
                title: randomEvent.title, // todo: desparately need to cleanup frontend components to match what is in firebase
                link: randomEvent.link,
                why: randomEvent.why,
                id: randomEvent.id,
                category: randomEvent.category,
                event_name: "publish",
                author_uid: randomEvent.author_uid,
            },
            noNewEvents: true,
        };
    } else {
        // random unseen event
        const event = unseenPublishEvents[0];
        if (curUserUid) {
            logViewEvent(event.id, curUserUid);
        }
        return {
            piece: {
                title: event.title, // todo: desparately need to cleanup frontend components to match what is in firebase
                link: event.link,
                why: event.why,
                id: event.id,
                category: eventsRef.category,
                event_name: "publish",
                author_uid: event.author_uid,
            },
            noNewEvents: false,
        };
    }
};
