import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "", link: "" };
  }

  callAPI() {
      fetch("http://localhost:9000/api/random")
          .then(res => res.json())
          .then(res => this.setState({
              content: res.content,
              link: res.link 
            }));
  }

  componentWillMount() {
      this.callAPI();
  }

  render() {
      return (
      <div className="App">
        <header className="App-header">
          <div>
            <p className="App-intro">;{this.state.content}</p>
            <a href={this.state.link}> Visit this Content </a>
          </div>
          <p className="App-intro">;{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }
}

export default App;
