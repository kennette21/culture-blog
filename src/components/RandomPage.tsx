import React, { Component } from "react";
// import React, { Component, useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { getBackgroundColors, GradientColors } from "../gradients";
import styled from "styled-components";
import FancyBackground, { FancyProps } from "../styles";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
	getRelevantPiece,
	logEvent,
	Piece,
	PieceCategory,
	ReactEvent,
} from "../eventStore";
import {
	AiFillCloseCircle,
	AiOutlineReload,
	AiFillHeart,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import firebase from "../firebase";
import "react-toastify/dist/ReactToastify.css";

declare global {
	interface Window {
		iframely: any;
	}
}

const App = styled.div`
	text-align: center;
`;

const PieceContainer = styled.div`
	width: 90%;
	height: 90%;
	display: flex;
	background-color: rgba(98%, 94.1%, 90.2%, 80%);
	flex-direction: column;
	border-radius: 16px;
	margin-top: 60px;
	margin-bottom: 80px;
	/* align-items: right; */
	justify-content: space-around;
	font-size: calc(10px + 2vmin);
	color: rgba(0%, 0%, 0%, 100%);
`;

const LeftTextDiv = styled.div`
	font-size: 16px;
	text-align: left;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
`;

const PieceTitle = styled.a`
	text-align: left;
	font-size: 24px;
	text-decoration: none;
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	margin: 10px 0;
`;

const ReloadBtn = styled.div<FancyProps>`
	margin: 0px 60px;
	width: 100px;
	height: 100%;
	border-radius: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 3px 3px rgba(51.5%, 51.4%, 51.4%, 100%);
	background-color: ${(props) => props.colors.first};
	cursor: pointer;

	&:hover {
		background-color: ${(props) => props.colors.second};
		box-shadow: 1px 1px rgba(9.3%, 9.3%, 9.3%, 100%);
		transition: 0.2s;
	}
`;

const ReactionButton = styled.div`
	width: 50px;
	height: 100%;
	border-radius: 25px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background: none;

	&:hover {
		background-color: gray;
		transition: 0.2s;
	}
`;

const PieceVisual = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
`;

const IframelyContainer = styled.div``;

const PieceInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 300px;
	max-width: 800px;
	margin: 0 auto;
`;

const ActionsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	margin-bottom: 20px;
	height: 100px;
	width: 100%;
`;

interface RandomPageState {
	piece: Piece | null; // TODO: return an array of pieces and store them in FE state
	noNewEvents: boolean;
	colors: GradientColors;
	selectedCategory: PieceCategory | null;
	userUid: string | null;
}

class RandomPage extends Component<RouteComponentProps, RandomPageState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			piece: null,
			noNewEvents: false,
			selectedCategory: null,
			colors: getBackgroundColors(),
			userUid: null,
		};
	}

	componentDidMount = () => {
		this.getDisplayPiece();
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					userUid: user.uid,
				});
			}
		});
	};

	selectCategory = (cat: PieceCategory) => {
		this.setState({
			selectedCategory: cat,
		});
	};

	getDisplayPiece = async () => {
		const relevantPiece = await getRelevantPiece(
			this.state.selectedCategory,
			this.state.userUid
		);
		this.setState({
			piece: relevantPiece.piece,
			noNewEvents: relevantPiece.noNewEvents,
		});
	};

	notify = (msg: string) => toast.success(msg);

	logReaction = (reaction: "like" | "dislike") => {
		const { piece, userUid } = this.state;
		if (piece && userUid) {
			const reactEvent: ReactEvent = {
				event_type: "react",
				piece_id: piece.event.id,
				user_uid: userUid,
				reaction: reaction,
			};
			logEvent(reactEvent)
				.then(() => toast.success(reaction + " successful"))
				.catch(() => toast.error(reaction + " failed to log"));
		} else {
			toast.error("cannot react because no piece or user_uid is null");
		}
		// load new piece
		this.getDisplayPiece();
	};

	getPieceSection = () => {
		const { piece } = this.state;

		if (piece) {
			return (
				<PieceInfo className="PieceInfo">
					<PieceTitle href={piece.event.link}>
						{piece.event.title}
					</PieceTitle>
					{piece.contentHtml && (
						<IframelyContainer
							dangerouslySetInnerHTML={{
								__html: piece.contentHtml,
							}}
						/>
					)}
					<LeftTextDiv>{piece.event.why}</LeftTextDiv>
				</PieceInfo>
			);
		} else {
			return <div>Loading</div>; // TODO: better loading screen exp: spinner? thinking face?
		}
	};

	render() {
		const { colors } = this.state;
		return (
			<App className="App">
				<ToastContainer
					position="bottom-left"
					autoClose={3000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
				/>
				<FancyBackground colors={colors} className="App-content">
					<Header />
					<PieceContainer className="PieceContainer">
						<PieceVisual className="Piece">
							{this.getPieceSection()}
						</PieceVisual>
						<ActionsContainer className="ActionsContainer">
							<ReactionButton
								onClick={() => this.logReaction("dislike")}
							>
								<AiFillCloseCircle size={"5em"} />
							</ReactionButton>
							<ReloadBtn
								colors={colors}
								onClick={() => this.getDisplayPiece()}
							>
								<AiOutlineReload size={80} />
							</ReloadBtn>
							<ReactionButton
								onClick={() => this.logReaction("like")}
							>
								<AiFillHeart size={"5em"} />
							</ReactionButton>
						</ActionsContainer>
					</PieceContainer>
					<Footer
						colors={colors}
						onChangeCategory={this.selectCategory}
						showFilter={true}
						filter={this.state.selectedCategory || "the"}
					/>
				</FancyBackground>
			</App>
		);
	}
}

export default RandomPage;
