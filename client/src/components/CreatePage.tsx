import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";
import getBackgroundColors, { GradientColors } from "../gradients";
import { FancyBackground, FancyInput, FancyButton } from "../styles";
import firebase from "../firebase";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { logPublish, PieceCategory, PublishEvent } from "../eventStore";

const App = styled.div`
	text-align: center;
`;

const PieceForm = styled.form`
	display: flex;
	flex-direction: column;
`;

export const FancySelect = styled(FancyInput.withComponent("select"))`
	color: pink;
`;

interface CreatePageState {
	title: string;
	link: string;
	why: string;
	category: string;
	colors: GradientColors;
}

const IntialSubState = {
	title: "",
	link: "",
	why: "",
	category: "",
};

class CreatePage extends Component<RouteComponentProps, CreatePageState> {
	constructor(props: RouteComponentProps) {
		super(props);
		this.state = {
			...IntialSubState,
			colors: getBackgroundColors(),
		};
	}

	handleChange(subState: any) {
		this.setState(subState);
	}

	handleSubmit(event: any) {
		const author = firebase.auth().currentUser;
		if (author) {
			const publishEvent: PublishEvent = {
				event_type: "publish",
				title: this.state.title,
				link: this.state.link,
				why: this.state.why,
				category: this.state.category as PieceCategory,
				author_uid: author.uid,
			};
			logPublish(publishEvent);
			event.preventDefault();
		} else {
			console.log("cannot create event, could not find firebase user");
		}
	}

	componentDidMount() {
		this.setState({ colors: getBackgroundColors() });
	}

	render() {
		const { colors } = this.state;
		return (
			<App className="App">
				<FancyBackground colors={colors} className="App-content">
					<Header />
					<PieceForm onSubmit={(event) => this.handleSubmit(event)}>
						<FancyInput
							colors={colors}
							type="text"
							placeholder="Title"
							value={this.state.title}
							onChange={(event) =>
								this.handleChange({ title: event.target.value })
							}
						/>
						<FancyInput
							colors={colors}
							placeholder="Link"
							type="text"
							value={this.state.link}
							onChange={(event) =>
								this.handleChange({ link: event.target.value })
							}
						/>
						<FancyInput
							colors={colors}
							placeholder="Why"
							type="text"
							value={this.state.why}
							onChange={(event) =>
								this.handleChange({ why: event.target.value })
							}
						/>
						<FancySelect
							colors={colors}
							value={this.state.category}
							onChange={(event) =>
								this.handleChange({
									category: event.target.value,
								})
							}
						>
							<option value="listen">Listen</option>
							<option value="watch">Watch</option>
							<option value="read">Read</option>
							<option value="look">Look</option>
							<option value="do">Do</option>
						</FancySelect>
						<FancyButton
							colors={colors}
							type="submit"
							value="Create"
						/>
					</PieceForm>
					<Footer colors={colors} />
				</FancyBackground>
			</App>
		);
	}
}

export default CreatePage;
