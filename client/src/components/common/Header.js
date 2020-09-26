import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';

const HeaderComp = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 10px;
    margin-right: 10px;
`;


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentWillMount() {
        this.getCurrentUser();
    }

    getCurrentUser() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: user
                })
                console.log("user is: ", user);
            } else {
                this.setState({
                    user: null
                })
            }
        });
    }

    getHeaderDisplay() {
        const { user } = this.state;
        if (user) {
            return "Hey the username is:, ", user.email; //TODO: should link to profile page where user can set some data
        } else {
            return <a href="/login">click here to sign in</a>
        }
    }

    render() {
        const { user } = this.state;
        return (
            <HeaderComp>
                {this.getHeaderDisplay()}
            </HeaderComp>
        );
    }
}

export default Header;
