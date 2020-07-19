import React, { Component } from 'react';
import gradients from './gradients'
import styled from 'styled-components';
import FancyBackground from './styles';

const App = styled.div`
    text-align: center;
`;

export const getBackgroundColors = () => {
    const gradientColors = gradients[Math.floor(Math.random() * gradients.length)].colors
    return {
      first: gradientColors[0],
      second: gradientColors[1]
    };
  }

class RandomPage extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "", link: "", title: "", why: "" };
  }

  getRandomPiece() {
    fetch("http://localhost:9000/api/random")
        .then(res => res.json())
        .then(res => this.setState({
            title: res.piece.title,
            content: res.piece.content,
            link: res.piece.link,
            why: res.piece.why,
          }));
  }

  componentWillMount() {
      this.getRandomPiece();
  }

  render() {
    const colors = getBackgroundColors();
    return (
      <App className="App">
        <FancyBackground colors={colors} className="App-content">
          <div>
            <div onClick={() => this.getRandomPiece()}>RELOAD</div>
            <h3>{this.state.title}</h3>
            <p className="content">{this.state.content}</p>
            <a href={this.state.link}> Visit this Content </a>
            <h5>Why This is Worth?</h5>
            <p>{this.state.why}</p>
          </div>
          <p className="App-intro">{this.state.apiResponse}</p>
        </FancyBackground>
      </App>
    );
  }
}

export default RandomPage;
