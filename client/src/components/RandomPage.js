import React, { Component } from 'react';
import getBackgroundColors from '../gradients'
import styled from 'styled-components';
import FancyBackground from '../styles';
import Header from './common/Header';
import firebase from '../firebase';
import svg from '../assets/reload.svg';
import { ReactSVG } from 'react-svg';
import Footer from './common/Footer';

const App = styled.div`
	text-align: center;
`;

const Overlay = styled.div`
	position: relative;
	width: 90%;
	height: 90%;
	display: flex;
	background-color: rgba(98%, 94.1%, 90.2%, 80%);
	flex-direction: column;
	border-radius: 16px;
	margin-top: 60px;
	margin-bottom: 60px;
	/* align-items: right; */
	/* justify-content: center; */
	font-size: calc(10px + 2vmin);
	color: rgba(0%, 0%, 0%, 100%);
`;

const LeftTextDiv = styled.div`
	font-size: 16px;
	text-align: left;
	font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`;

const PieceTitle = styled.a`
	text-align: left;
	font-size: 24px;
	text-decoration: none;
	font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	margin: 10px 0;
`;

const ReloadBtn = styled.div`
	width: 100px;
	height: 100px;
	padding: 20px;
	background-image: url("../assets/reload.svg");
	border-radius: 6px;
	box-shadow: 3px 3px rgba(51.5%, 51.4%, 51.4%, 100%);
	background-color: ${props => props.colors.first};
	cursor: pointer;

	&:hover {
		background-color: ${props => props.colors.second};
		box-shadow: 1px 1px rgba(9.3%, 9.3%, 9.3%, 100%);
		transition: .2s;
	}
`;

const Centerbox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const PieceInfo= styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 300px;
    max-width: 800px;
`;

const ActionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
`;

class RandomPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			link: "",
			title: "",
			why: "",
			colors: getBackgroundColors(),
			noNewEvents: false,
		};
	}

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

		const curUserUid = firebase.auth().currentUser.uid;
		const userViewEventsQuery = await eventsRef
			.where('event_type', '==', 'view')
			.where('user_uid', '==', curUserUid)
			.get();

		const userViewEvents = [];
		userViewEventsQuery.forEach(function (ev) {
			userViewEvents.push({ "id": ev.id, ...ev.data() });
		});

		const unseenPublishEvents = publishEvents.filter(ev => !userViewEvents.map(view => view.piece_id).includes(ev.id));

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

	async logViewEvent(pieceId, userUid) {
		const viewEvent = {
			event_type: "view",
			piece_id: pieceId,
			user_uid: userUid,
		}
		const docRef = firebase.firestore().collection('events').add(viewEvent);
		docRef.then(console.log("successfully created view"));
	}

	componentDidMount() {
		this.getRandomPiece();
	}

	render() {
		const { title, link, why, colors } = this.state
		return (

			<App className="App">
				<FancyBackground colors={colors} className="App-content">
					<Header />
					<Overlay className="Overlay">
						<Centerbox>
							<PieceInfo className="PieceInfo">
								<PieceTitle href={link}>{title}</PieceTitle>
								<LeftTextDiv>{why}</LeftTextDiv>
							</PieceInfo>
						</Centerbox>
						<ActionsContainer className="ActionsContainer">
							<ReloadBtn colors={colors} onClick={() => this.getRandomPiece()}>
								<ReactSVG src={svg} />
							</ReloadBtn>
						</ActionsContainer>
					</Overlay>
					<Footer colors={colors}/>
				</FancyBackground>
			</App>
		);
	}
}

export default RandomPage;
