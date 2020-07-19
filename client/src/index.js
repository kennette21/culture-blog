import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router } from '@reach/router'
import * as serviceWorker from './serviceWorker';
import RandomPage from './RandomPage';
import PiecesPage from './PiecesPage';
import CreatePage from './CreatePage';

ReactDOM.render(
  <Router>
    <RandomPage path="/random" />
    <PiecesPage path="/all" />
    <CreatePage path="/create" />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
