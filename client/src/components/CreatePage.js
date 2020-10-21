import React, { Component } from 'react';
import styled from 'styled-components';
import getBackgroundColors from '../gradients';
import {FancyBackground, FancyInput, FancyButton} from '../styles';
import firebase from '../firebase';
import Header from './common/Header';
import Footer from './common/Footer';

const App = styled.div`
    text-align: center;
`;

const PieceForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const FancySelect = styled(FancyInput.withComponent("select"))`
    color: pink;
`;

class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            why: '',
            category: '',
            colors: {},
        };
    }

    handleChange(subState) {
        this.setState(subState);
    }

    handleSubmit(event) {
        const author = firebase.auth().currentUser;
        const publish_event = {
            event_type: "publish",
            title: this.state.title,
            link: this.state.link,
            why: this.state.why,
            category: this.state.category,
            author_uid: author.uid,
            author_email: author.email,
        };
        this.publishPiece(publish_event);
        event.preventDefault();
    }

    async publishPiece(publish_event) {
        const docRef = firebase.firestore().collection('events').add(publish_event);
        docRef.then(() => {
            this.setState({
                title: '',
                link: '',
                why: '',
                category: '',
            })
        });
    }

    componentDidMount() {
        this.setState({colors: getBackgroundColors()});
    }

    render() {
        const {colors} = this.state
        return (
            <App className="App">
                <FancyBackground colors={colors} className="App-content">
                    <Header/>
                    <PieceForm onSubmit={(event) => this.handleSubmit(event)}>
                        <FancyInput colors={colors} type="text" placeholder="Title" value={this.state.title} onChange={event => this.handleChange({title: event.target.value})} />
                        <FancyInput colors={colors} placeholder="Link" type="text" value={this.state.link} onChange={event => this.handleChange({link: event.target.value})} />
                        <FancyInput colors={colors} placeholder="Why" type="text" value={this.state.why} onChange={event => this.handleChange({why: event.target.value})} />
                        <FancySelect colors={colors} value={this.state.value} onChange={event => this.handleChange({category: event.target.value})}>
                            <option value="listen">Listen</option>
                            <option value="watch">Watch</option>
                            <option value="read">Read</option>
                            <option value="look">Look</option>
                            <option value="do">Do</option>
                        </FancySelect>
                        <FancyButton colors={colors} type="submit" value="Create" />
                    </PieceForm>
                    <Footer colors={colors}/>
                </FancyBackground>
            </App>
        );
    }
}

export default CreatePage;
