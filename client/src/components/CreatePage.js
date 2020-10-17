import React, { Component } from 'react';
import styled from 'styled-components';
import getBackgroundColors from '../gradients';
import FancyBackground from '../styles';
import firebase from '../firebase';
import Header from './common/Header';

const App = styled.div`
    text-align: center;
`;

const PieceForm = styled.form`
    display: flex;
    flex-direction: column;
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
        docRef.then(console.log("successfully created piece"));
    }

    componentDidMount() {
        this.setState({colors: getBackgroundColors()});
    }

    render() {
        return (
            <App className="App">
                <FancyBackground colors={this.state.colors} className="App-content">
                    <Header/>
                    <PieceForm onSubmit={(event) => this.handleSubmit(event)}>
                        <label>
                            Title:
                        <input type="text" value={this.state.title} onChange={event => this.handleChange({title: event.target.value})} />
                        </label>
                        <label>
                            Link:
                        <input type="text" value={this.state.link} onChange={event => this.handleChange({link: event.target.value})} />
                        </label>
                        <label>
                            Why:
                        <input type="text" value={this.state.why} onChange={event => this.handleChange({why: event.target.value})} />
                        </label>
                        <select value={this.state.value} onChange={event => this.handleChange({category: event.target.value})}>
                            <option value="listen">Listen</option>
                            <option value="watch">Watch</option>
                            <option value="read">Read</option>
                            <option value="look">Look</option>
                            <option value="do">Do</option>
                        </select>
                        <input type="submit" value="Submit" />
                    </PieceForm>
                </FancyBackground>
            </App>
        );
    }
}

export default CreatePage;
