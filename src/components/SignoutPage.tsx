import React, { Component } from "react";
import AppContainer from "./common/AppContainer";
import firebase from "../firebase";
import getBackgroundColors, { GradientColors } from "../gradients";
import { RouteComponentProps } from "@reach/router";

interface SignoutPageState {
	colors: GradientColors;
	status: string;
}

class SignoutPage extends Component<RouteComponentProps, SignoutPageState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			colors: getBackgroundColors(),
			status: "pending",
		};
	}

	signout() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log("woohoo signout successful!!");
				this.setState({
					status: "success",
				});
			})
			.catch((error) => {
				console.log("ohhh no signout failed :( ", error);
				this.setState({
					status: "failed",
				});
			});
	}

	signoutStatus() {
		switch (this.state.status) {
			case "pending":
				return "Attempting to sing you out";
			case "success":
				return "Bye bye! Successfully signed out";
			case "failed":
				return "Somethign went wrong, could not sign you out :(";
			default:
				return "Somethign went wrong :(";
		}
	}

	componentDidMount() {
		this.signout();
	}

	render() {
		const { colors } = this.state;
		return (
			<AppContainer
				colors={colors}
				filter={""}
				showFilter={false}
				onChangeCategory={() => {}}
			>
				<div>{this.signoutStatus()}</div>
			</AppContainer>
		);
	}
}

export default SignoutPage;
