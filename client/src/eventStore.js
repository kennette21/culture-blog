// import firebase from '../firebase';

export default class EventStore {
    async getRandomPiece() {
		const eventsRef = firebase.firestore().collection('events');
		const publishEventsQuery = await eventsRef
			.where('event_type', '==', 'publish')
			.get();
		if (publishEventsQuery.empty) {
			console.log('No publish events.');
		}
		const publishEvents = [];
		publishEventsQuery.forEach(function (ev) {
			publishEvents.push({ "id": ev.id, ...ev.data() });
		});

		const curUserUid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
		const userViewEvents = [];

		if (curUserUid) {
			const userViewEventsQuery = await eventsRef
				.where('event_type', '==', 'view')
				.where('user_uid', '==', curUserUid)
				.get();

			userViewEventsQuery.forEach(function (ev) {
				userViewEvents.push({ "id": ev.id, ...ev.data() });
			});
		}

		const unseenPublishEvents = curUserUid ? publishEvents.filter(ev => !userViewEvents.map(view => view.piece_id).includes(ev.id)) : [];

		if (unseenPublishEvents.length === 0) {
			const randomEvent = publishEvents[Math.floor(Math.random() * publishEvents.length)]
			this.setState({
				noNewEvents: true,
				link: randomEvent.link,
				title: randomEvent.title,
				why: randomEvent.why,
			}) // todo: improve display of no events


		} else {
			this.setState({
				title: unseenPublishEvents[0].title, // todo: desparately need to cleanup frontend components to match what is in firebase
				link: unseenPublishEvents[0].link,
				why: unseenPublishEvents[0].why,
			})

			this.logViewEvent(unseenPublishEvents[0].id, curUserUid);
		}
	}
}