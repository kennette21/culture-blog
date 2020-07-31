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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
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

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { username, password } = this.state;

    fetch("http://localhost:9000/api/login", {
        method: 'POST',
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache',
        credentials: 'include', // include, *same-origin, omit
        headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'origin-when-cross-origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(this.state) // body data type must match "Content-Type" header
      })
      .then((result) => {
        console.log("wassup");
        console.log(result);
      })
      .catch((err) => {
        console.log("crimeny: ", err);
      });
  }

  render() {
    const colors = getBackgroundColors();
    const { username, password } = this.state;
    return (
      <App className="App">
        <FancyBackground colors={colors} className="App-content">
        <form onSubmit={this.onSubmit} method="post">
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
                <input type="submit" value="Log In"/>
            </div>
        </form>
        </FancyBackground>
      </App>
    );
  }
}

export default LoginPage;
