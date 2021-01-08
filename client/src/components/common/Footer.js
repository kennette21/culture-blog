import React, { Component } from 'react';
import styled from 'styled-components';
import {FancySelect} from '../CreatePage';

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

const FanSel = styled(FancySelect)`
    color: ${props => props.colors.first};
    font-size: 38px;
`;


/***
 * adding users to the "the"
 * 
 * add a dropdown component instead of the the.
 * The options are all the users in the culture blog
 * 
 * When you select on you only see those users currated posts
 * 
 * change the url to something like:
 * www.{the}.cultureblog.com
 * www.cultureblog.{the}.com
 * www.the.cultureblog.com/{the}/{category}
 * ??? probably the third is easiest
 * 
 * 
 */


class Footer extends Component {
    constructor(props) {
		super(props);
		this.state = {
			filter: "the" // todo: this should come from react router somehow
		};
    }

    handleChange(subState) {
        this.setState(subState);
    }

    getCultureBlogCategory = () => {
        return (
            <FancySelect colors={this.props.colors} value={this.state.filter} onChange={event => this.handleChange({filter: event.target.value})}>
                            <option value="listen">Listen</option>
                            <option value="listen">Listen</option>
                            <option value="watch">Watch</option>
                            <option value="read">Read</option>
                            <option value="look">Look</option>
                            <option value="do">Do</option>
                        </FancySelect>
        )
    }
    
    render() {
        return (
            <FooterComp colors={this.props.colors}>
                <FanSel colors={this.props.colors} value={this.state.filter} onChange={event => this.handleChange({filter: event.target.value})}>
                            <option value="all">The</option>
                            <option value="listen">Listen</option>
                            <option value="watch">Watch</option>
                            <option value="read">Read</option>
                            <option value="look">Look</option>
                            <option value="do">Do</option>
                        </FanSel> culture blog
            </FooterComp>
        );
    }
}

export default Footer;
