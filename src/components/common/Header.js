import React, { Component } from "react";
import styled from "styled-components";
import firebase from "../../firebase";
import { Link } from "@reach/router";

const HeaderComp = styled.div`
	justify-content: flex-end;
	display: flex;
	height: 30px;
	color: white;
	width: 100%;
	flex-direction: row;
	font-size: 18px;
	margin-top: 10px;
`;

const RightSide = styled.div`
	justify-self: flex-end;
`;

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
		};
	}

	componentDidMount() {
		this.getCurrentUser();
	}

	getCurrentUser() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					user: user,
				});
				console.log("user is: ", user);
			} else {
				this.setState({
					user: null,
				});
			}
		});
	}

	getHeaderDisplay() {
		const { user } = this.state;
		if (user) {
			return user.email; //TODO: should link to profile page where user can set some data
		} else {
			return <Link to="/login">Sign in</Link>;
		}
	}

	render() {
		return (
			<HeaderComp>
				<RightSide>{this.getHeaderDisplay()}</RightSide>
			</HeaderComp>
		);
	}
}

export default Header;
