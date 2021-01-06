import React, { Component } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { RouteComponentProps } from "@reach/router";

// css goes here
const List = styled.div``;

const Item = styled.div``;

class PiecesPage extends Component<RouteComponentProps> {
	// api call to get all pieces from the api goes here
	// constructor(props) {
	//     super(props);
	//     this.state = {
	//         pieces: []
	//     };
	// }

	// async getPieces() {
	//     const db = firebase.firestore()

	//     const piecesRef = db.collection('pieces');
	//     const snapshot = await piecesRef.get();
	//     const dataArray = [];
	//     snapshot.forEach(doc => {
	//         dataArray.push(doc.data())
	//     });
	//     this.setState({
	//         pieces: dataArray
	//     })
	// }

	// listPices() {
	//     console.log(this.state.pieces);
	//     return this.state.pieces.map(piece => (<Item key={piece.why}>{piece.why}</Item>))
	// }

	// componentDidMount() {
	//     this.getPieces();
	// }

	render() {
		return (
			// html of the list goes here.
			<List className="pieces-list"></List>
		);
	}
}

export default PiecesPage;
