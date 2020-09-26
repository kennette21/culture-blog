import React, { Component } from 'react';
import getBackgroundColors from '../gradients'
import styled from 'styled-components';
import FancyBackground from '../styles';
import Header from './common/Header';

const App = styled.div`
    text-align: center;
`;

class RandomPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      content: "",
      link: "",
      title: "",
      why: "",
      colors: getBackgroundColors(),
     };
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
    const {title, content, link, why, colors} = this.state
    return (
      <App className="App">
        <FancyBackground colors={colors} className="App-content">
          <Header/>
          <div>
            <div onClick={() => this.getRandomPiece()}>RELOAD</div>
            <h3>{title}</h3>
            <p className="content">{content}</p>
            <a href={link}> Visit this Content </a>
            <h5>Why This is Worth?</h5>
            <p>{why}</p>
          </div>
          <p className="App-intro">{this.state.apiResponse}</p>
        </FancyBackground>
      </App>
    );
  }
}

export default RandomPage;
