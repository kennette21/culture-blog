import React, { Component } from 'react';
import styled from 'styled-components';
import FancyBackground from '../styles';
import firebase from '../firebase';
import getBackgroundColors from '../gradients';

const App = styled.div`
    text-align: center;
`;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      wantToSignup: false,
      colors: getBackgroundColors(),
    };
  }


  onChange = (e) => {
    /*
      Because we named the inputs to match their
      corresponding values in state, it's
      super easy to update the state
    */
    this.setState({ [e.target.name]: e.target.value });
  }

  login = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { username, password } = this.state;
    console.log("inside on submit: ", username, password);

    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(() => {
        window.location.href = "/random";
      })
      .catch((error) => {
        console.log("tried logging in with given creds, failed b/c: ", error.code, error.message);
        this.setState({
          wantToSignup: true
        })
      });
  }

  signup = () => {
    const { username, password } = this.state;
    console.log("inside signup: ", username, password);
    firebase.auth().createUserWithEmailAndPassword(username, password)
      .then(() => {
        window.location.href = "/random";
      })
      .catch((error) => {
        console.log("we had a maaaaasive error in signup: ", error.code, error.message);
      });
  }

  renderWantToSignup = () => {
    if (this.state.wantToSignup) {
      return <button onClick={this.signup}>Want to Signup Instead?</button> //TODO: style this button!
    }
  }

  render() {
    const { username, password, colors } = this.state;
    return (
      <App className="App">
        <FancyBackground colors={colors} className="App-content">
          <form onSubmit={this.login}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={this.onChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input type="submit" value="Log In" />
            </div>
          </form>
          {this.renderWantToSignup()}
        </FancyBackground>
      </App>
    );
  }
}

export default LoginPage;
