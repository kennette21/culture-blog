import React, { Component } from "react";
// import React, { Component, useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { getBackgroundColors, GradientColors } from "../gradients";
import styled from "styled-components";
import FancyBackground, { FancyProps } from "../styles";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { getRelevantPiece, PublishedEvent } from "../eventStore";
import {
	AiFillCloseCircle,
	AiOutlineReload,
	AiFillHeart,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
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
	margin-bottom: 60px;
	/* align-items: right; */
	/* justify-content: center; */
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
	border-radius: 3px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: none;
	background: none;
`;

const Piece = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 20px;
`;

const PieceInfo = styled.div`
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
	height: 100px;
	width: 100%;
`;

// const RandomPageWithHooks = () => {
// 	// const [state, setState()] = useState({ link: '', title: ''})

// 	useEffect(() => {
// 		// logic
// 	}, [link, state])

// 	return  (
// 	<App className="App">
// 		<FancyBackground colors={colors} className="App-content">
// 			<Header />
// 			<Overlay className="Overlay">
// 				<Centerbox>
// 					<PieceInfo className="PieceInfo">
// 						<PieceTitle href={link}>{title}</PieceTitle>
// 						<LeftTextDiv>{why}</LeftTextDiv>
// 					</PieceInfo>
// 				</Centerbox>
// 				<ActionsContainer className="ActionsContainer">
// 					<ReloadBtn colors={colors} onClick={() => getRandomPiece()}>
// 						<ReactSVG src={svg} />
// 					</ReloadBtn>
// 				</ActionsContainer>
// 			</Overlay>
// 			<Footer colors={colors}/>
// 		</FancyBackground>
// 	</App>)
// }

interface RandomPageState {
	piece: PublishedEvent | null; // TODO: return an array of pieces and store them in FE state
	contentHtml: string | null;
	noNewEvents: boolean;
	colors: GradientColors;
}

class RandomPage extends Component<RouteComponentProps, RandomPageState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			piece: null,
			contentHtml: null,
			noNewEvents: false,
			colors: getBackgroundColors(),
		};
	}

	getIframelyPieceHtml = async (url: string) => {
		const resp = await (
			await fetch(
				"http://iframe.ly/api/iframely?url=" +
					url +
					"&api_key=532610e8a5ae3742540e3a&iframe=1&omit_script=1"
			)
		).json(); // TODO: extract api key
		// TODO: some error handling if iframely does not like url, just return some simple html ancor for link
		this.setState({
			contentHtml: resp.html,
		});
	};

	componentDidMount = () => {
		this.getDisplayPiece();
	};

	getDisplayPiece = async () => {
		const relevantPiece = await getRelevantPiece();
		this.getIframelyPieceHtml(relevantPiece.piece.link);
		this.setState({
			piece: relevantPiece.piece,
			noNewEvents: relevantPiece.noNewEvents,
		});
	};

	getPieceSection = () => {
		const { piece, contentHtml } = this.state;

		if (piece) {
			return (
				<PieceInfo className="PieceInfo">
					<PieceTitle href={piece.link}>{piece.title}</PieceTitle>
					{contentHtml && (
						<div
							dangerouslySetInnerHTML={{ __html: contentHtml }}
						/>
					)}
					<LeftTextDiv>{piece.why}</LeftTextDiv>
				</PieceInfo>
			);
		} else {
			return <div>Loading</div>; // TODO: better loading screen exp: spinner? thinking face?
		}
	};

	notify = (msg: string) => toast.success(msg);

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
						<Piece className="Piece">
							{this.getPieceSection()}
						</Piece>
						<ActionsContainer className="ActionsContainer">
							<ReactionButton
								onClick={() => this.notify("disliked piece")}
							>
								<AiFillCloseCircle size={"5em"} />
							</ReactionButton>
							<ReloadBtn // TODO: use react icons instead of this nonsense
								colors={colors}
								onClick={() => this.getDisplayPiece()}
							>
								<AiOutlineReload size={80} />
							</ReloadBtn>
							<ReactionButton
								onClick={() => this.notify("liked piece")}
							>
								<AiFillHeart size={"5em"} />
							</ReactionButton>
						</ActionsContainer>
					</PieceContainer>
					<Footer colors={colors} />
				</FancyBackground>
			</App>
		);
	}
}

export default RandomPage;
