import React, { Component } from 'react';
import getBackgroundColors from '../gradients'
import styled from 'styled-components';
import FancyBackground from '../styles';
import Header from './common/Header';
import firebase from '../firebase';

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

  async getRandomPiece() {
    // getting random documents in firestore actually seems not trivial.
    // https://stackoverflow.com/questions/46798981/firestore-how-to-get-random-documents-in-a-collection
    //
    // might have to incorperate the "feed" event store sooner than I thought.
    
    const notRandomRef = firebase.firestore().collection('pieces').doc('1')
    const notRandomDoc = await notRandomRef.get();
    if (!notRandomDoc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', notRandomDoc.data());
    }

    this.setState({
      title: notRandomDoc.data().name, // todo: desparately need to cleanup frontend components to match what is in firebase
      content: notRandomDoc.data().content,
      link: notRandomDoc.data().link,
      why: notRandomDoc.data().why,
    })
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
