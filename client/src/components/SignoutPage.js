import React, { Component } from 'react';
import styled from 'styled-components';
import { FancyBackground, App } from '../styles';
import firebase from '../firebase';
import getBackgroundColors from '../gradients';

class SignoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: getBackgroundColors(),
            status: "pending"
        };
    }

    signout() {
        firebase.auth().signOut().then(() => {
            console.log("woohoo signout successful!!")
            this.setState({
                status: "success"
            });
        }).catch((error) => {
            console.log("ohhh no signout failed :( ", error);
            this.setState({
                status: "failed"
            });
        })
    }

    signoutStatus() {
        switch (this.state.status) {
            case "pending":
                return "Attempting to sing you out";
            case "success":
                return "Bye bye! Successfully signed out";
            case "failed":
                return "Somethign went wrong, could not sign you out :(";
        }
    }

    componentWillMount() {
        this.signout();
    }

    render() {
        const { username, password, colors } = this.state;
        return (
            <App className="App">
                <FancyBackground colors={colors} className="App-content">
                    <div>{this.signoutStatus()}</div>
                </FancyBackground>
            </App>
        );
    }
}

export default SignoutPage;
