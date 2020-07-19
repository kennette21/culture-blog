import React, { Component } from 'react';
import styled from 'styled-components';
import { getBackgroundColors } from './RandomPage';
import FancyBackground from './styles';

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
            name: '',
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
        console.log("and the state is", this.state);
        const piece = {
            name: this.state.name,
            link: this.state.link,
            why: this.state.why,
            category: this.state.category,
        };
        console.log("here is piece going to craete piece: ", piece)
        this.createPiece(piece);
        event.preventDefault();
    }

    // Example POST method implementation:
    async postData(url = '', data = {}) {
        // Default options are marked with *
        console.log("in post data, here is the data: ", data);
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    createPiece(piece) {
        this.postData('http://localhost:9000/api/create', piece)
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }

    componentDidMount() {
        this.setState({colors: getBackgroundColors()});
    }

    render() {
        return (
            <App className="App">
                <FancyBackground colors={this.state.colors} className="App-content">
                    <PieceForm onSubmit={(event) => this.handleSubmit(event)}>
                        <label>
                            Name:
                        <input type="text" value={this.state.name} onChange={event => this.handleChange({name: event.target.value})} />
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
