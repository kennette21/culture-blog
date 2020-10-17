import React, { Component } from 'react';
import getBackgroundColors from '../gradients'
import styled from 'styled-components';
import FancyBackground from '../styles';
import Header from './common/Header';
import firebase from '../firebase';

const App = styled.div`
		text-align: center;
`;

class RandomPage extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			link: "",
			title: "",
			why: "",
			colors: getBackgroundColors(),
			noEvents: false,
		 };
	}

	async getRandomPiece() {
		// getting random documents in firestore actually seems not trivial.
		// https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection
		//
		// might have to incorperate the "feed" event store sooner than I thought.

		const eventsRef = firebase.firestore().collection('events');
		const publishEventsQuery = await eventsRef
			.where('event_type', '==', 'publish')
			.get();
		if (publishEventsQuery.empty) {
			console.log('No publish events.');
			// return;
		}
		const publishEvents = [];
		publishEventsQuery.forEach(function(ev) {
			publishEvents.push({"id": ev.id, ...ev.data()});
		});
		console.log("publishEvents: ", publishEvents);

		const curUserUid = firebase.auth().currentUser.uid;
		const userViewEventsQuery = await eventsRef
			.where('event_type', '==', 'view')
			.where('user_uid', '==', curUserUid)
			.get();

		const userViewEvents = [];
		userViewEventsQuery.forEach(function(ev) {
			userViewEvents.push({"id": ev.id, ...ev.data()});
		});
		
		console.log("userViewEvents ", userViewEvents);

		const unseenPublishEvents = publishEvents.filter(ev => !userViewEvents.map(view => view.piece_id).includes(ev.id));
		console.log("unseenPublishEvents: ", unseenPublishEvents);

		if (unseenPublishEvents.length === 0) {
			this.setState({
				noEvents: true
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

	async logViewEvent(pieceId, userUid) {
		const viewEvent = {
			event_type: "view",
			piece_id: pieceId,
			user_uid: userUid,
		}
		const docRef = firebase.firestore().collection('events').add(viewEvent);
		docRef.then(console.log("successfully created view"));
	}

	componentWillMount() {
			this.getRandomPiece();
	}

	render() {
		const {title, link, why, noEvents, colors} = this.state
		return (
			<App className="App">
				<FancyBackground colors={colors} className="App-content">
					<Header/>
					<div>
						<div onClick={() => this.getRandomPiece()}>RELOAD</div>
						<h3>{title}</h3>
						<a href={link}> Visit this Content </a>
						<h5>Why This is Worth?</h5>
						<p>{why}</p>
						<a>{noEvents && "you have no events"}</a>
					</div>
					<p className="App-intro">{this.state.apiResponse}</p>
				</FancyBackground>
			</App>
		);
	}
}

export default RandomPage;
