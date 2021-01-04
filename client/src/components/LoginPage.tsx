import React, { Component } from 'react';
import styled from 'styled-components';
import {FancyBackground, FancyInput, FancyButton} from '../styles';
import firebase from 'firebase';
import {getBackgroundColors, GradientColors} from '../gradients';
import Footer from './common/Footer';

const App = styled.div`
    text-align: center;
`;

const VFancyButton = styled.button`
  padding: 1rem 1.4rem;
  background: transparent;
  font-size: 32px;
  transition: all 0.3s;
  margin: 10px 0;
  border: 0.3rem solid ${props => props.colors.first};
  border-radius: 9px;
  outline-width: 0;
  color: gray;
  width: 100%;

  &:hover{
    background-color: rgba(41.2%, 41.2%, 41.2%, 30%)
  }
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


  onChange = (e: MouseEvent) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  login = (e: MouseEvent) => {
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
      return <VFancyButton colors={this.state.colors} onClick={this.signup}>Want to Signup?</VFancyButton> //TODO: style this button!
    }
  }

  render() {
    const { username, password, colors } = this.state;
    return (
      <App className="App">
        <FancyBackground colors={colors} className="App-content">
          <form onSubmit={this.login}>
            <div>
              <FancyInput colors={colors}
                type="text"
                name="username"
                value={username}
                placeholder="username"
                onChange={this.onChange}
              />
            </div>
            <div>
              <FancyInput colors={colors}
                type="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={this.onChange}
              />
            </div>
            <div>
              <FancyButton colors={colors} type="submit" value="Enter" />
            </div>
            {this.renderWantToSignup()}
          </form>
          <Footer colors={colors}/>
        </FancyBackground>
      </App>
    );
  }
}

export default LoginPage;
