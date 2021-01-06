import React, { Component, useState, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { getBackgroundColors, GradientColors } from "../gradients";
import styled from "styled-components";
import FancyBackground, { FancyProps } from "../styles";
import Header from "./common/Header";
import firebase from "../firebase";
import svg from "../assets/reload.svg";
import { ReactSVG } from "react-svg";
import Footer from "./common/Footer";
import { getRelevantPiece, PublishedEvent } from "../eventStore";

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
    width: 100px;
    height: 100px;
    padding: 20px;
    background-image: url("../assets/reload.svg");
    border-radius: 6px;
    box-shadow: 3px 3px rgba(51.5%, 51.4%, 51.4%, 100%);
    background-color: ${(props) => props.colors.first};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.colors.second};
        box-shadow: 1px 1px rgba(9.3%, 9.3%, 9.3%, 100%);
        transition: 0.2s;
    }
`;

const Centerbox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
    piece: PublishedEvent | null;
    noNewEvents: boolean;
    colors: GradientColors;
}

class RandomPage extends Component<RouteComponentProps, RandomPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            piece: null,
            noNewEvents: false,
            colors: getBackgroundColors(),
        };
    }

    logViewEvent = (pieceId: any, userUid: any) => {
        const viewEvent = {
            event_type: "view",
            piece_id: pieceId,
            user_uid: userUid,
        };
        firebase
            .firestore()
            .collection("events")
            .add(viewEvent)
            .then(() => console.log("successfully created view"));
    };

    componentDidMount = () => {
        this.getDisplayPiece();
    };

    getDisplayPiece = async () => {
        const relevantPiece = await getRelevantPiece();
        this.setState({
            piece: relevantPiece.piece,
            noNewEvents: relevantPiece.noNewEvents,
        });
    };

    getPieceSection = () => {
        const { piece } = this.state;

        if (piece) {
            return (
                <PieceInfo className="PieceInfo">
                    <PieceTitle href={piece.link}>{piece.title}</PieceTitle>
                    <LeftTextDiv>{piece.why}</LeftTextDiv>
                </PieceInfo>
            );
        } else {
            return <div>Whoops null piece</div>;
        }
    };

    render() {
        const { piece, colors } = this.state;
        return (
            <App className="App">
                <FancyBackground colors={colors} className="App-content">
                    <Header />
                    <Overlay className="Overlay">
                        <Centerbox>{this.getPieceSection()}</Centerbox>
                        <ActionsContainer className="ActionsContainer">
                            <ReloadBtn
                                colors={colors}
                                onClick={() => this.getDisplayPiece()}
                            >
                                <ReactSVG src={svg} />
                            </ReloadBtn>
                        </ActionsContainer>
                    </Overlay>
                    <Footer colors={colors} />
                </FancyBackground>
            </App>
        );
    }
}

export default RandomPage;
