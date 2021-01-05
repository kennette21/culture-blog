import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router } from "@reach/router";
import RandomPage from "./components/RandomPage";
import PiecesPage from "./components/PiecesPage";
import CreatePage from "./components/CreatePage";
import LoginPage from "./components/LoginPage";
import SignoutPage from "./components/SignoutPage";

ReactDOM.render(
  <Router>
    <RandomPage path="/random" />
    <PiecesPage path="/all" />
    <CreatePage path="/create" />
    <LoginPage path="/login" />
    <SignoutPage path="/logout" />
  </Router>,
  document.getElementById("root")
);
