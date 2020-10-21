import React, { Component } from 'react';
import styled from 'styled-components';

const FooterComp = styled.div`
    color: ${props => props.colors.first};
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    position: fixed;
    bottom: 0;
    right: 0;
    font-size: 42px;
    margin-top: 10px;
    margin-right: 10px;
`;


class Footer extends Component {
    render() {
        return (
            <FooterComp colors={this.props.colors}>
                the culture blog
            </FooterComp>
        );
    }
}

export default Footer;
