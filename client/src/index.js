import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router } from '@reach/router'
import * as serviceWorker from './serviceWorker';
import RandomPage from './components/RandomPage';
import PiecesPage from './components/PiecesPage';
import CreatePage from './components/CreatePage';
import LoginPage from './components/LoginPage';
import SignoutPage from './components/SignoutPage';

ReactDOM.render(
  <Router>
    <RandomPage path="/random" />
    <PiecesPage path="/all" />
    <CreatePage path="/create" />
    <LoginPage path="/login" />
    <SignoutPage path="/logout" />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
