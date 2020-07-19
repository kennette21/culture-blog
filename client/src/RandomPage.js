import React, { Component } from 'react';
import gradients from './gradients'
import styled from 'styled-components';

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

class RandomPage extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "", link: "" };
  }

  getBackgroundColors() {
    const gradientColors = gradients[Math.floor(Math.random() * gradients.length)].colors
    return {
      first: gradientColors[0],
      second: gradientColors[1]
    };
  }

  getRandomPiece() {
    fetch("http://localhost:9000/api/random")
        .then(res => res.json())
        .then(res => this.setState({
            content: res.content,
            link: res.link 
          }));
  }

  componentWillMount() {
      this.getRandomPiece();
  }

  render() {
    const colors = this.getBackgroundColors();
    return (
      <App className="App">
        <FancyBackground colors={colors} className="App-content">
          <div>
            <div onClick={() => this.getRandomPiece()}>RELOAD</div>
            <p className="App-intro"> The content is: {this.state.content}</p>
            <a href={this.state.link}> Visit this Content </a>
          </div>
          <p className="App-intro">{this.state.apiResponse}</p>
        </FancyBackground>
      </App>
    );
  }
}

export default RandomPage;
