import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';
import { Link } from "@reach/router";

const HeaderComp = styled.div`
    position: fixed;
    color: white;
    top: 0;
    right: 0;
    font-size: 18px;
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

    componentDidMount() {
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
            return user.email //TODO: should link to profile page where user can set some data
        } else {
            return <Link to="/login">Sign in</Link>
        }
    }

    render() {
        return (
            <HeaderComp>
                {this.getHeaderDisplay()}
            </HeaderComp>
        );
    }
}

export default Header;
