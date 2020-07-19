import React, { Component } from 'react';
import styled from 'styled-components';

// css goes here
const List = styled.div`
`;

class PiecesList extends Component {
    // api call to get all pieces from the api goes here

    render() {
        return (
            // html of the list goes here.
            <List className="pieces-list">
                this is a list of pieces
            </List>
        );
      }
}