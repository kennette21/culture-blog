import React, { Component } from 'react';
import styled from 'styled-components';
import { getBackgroundColors } from './RandomPage';

const App = styled.div`
    text-align: center;
`;

const FancyBackground = styled.div`
  background: ${props => props.colors.first || "#bdc3c7"};
  background: -webkit-linear-gradient(to right, ${props => props.colors.first}, ${props => props.colors.second});
  background: linear-gradient(to right, ${props => props.colors.first}, ${props => props.colors.second});
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
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
            colors: {},
        };
    }

    handleChange(subState) {
        this.setState(subState);
    }

    handleSubmit(event) {
        console.log("and the state is", this.state);
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
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
                        <input type="submit" value="Submit" />
                    </PieceForm>
                </FancyBackground>
            </App>
        );
    }
}

export default CreatePage;
