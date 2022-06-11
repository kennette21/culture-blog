import { Redirect, Router } from "@reach/router";
import React from "react";
import CreatePage from "./components/CreatePage";
import LoginPage from "./components/LoginPage";
import RandomPage from "./components/RandomPage";
import SignoutPage from "./components/SignoutPage";

const App = () => {
	return (
		<Router>
			<Redirect from="/" to="/random/all" />
			<RandomPage path="/random/:category" />
			<CreatePage path="/create" />
			<LoginPage path="/login" />
			<SignoutPage path="/logout" />
		</Router>
	);
};

export default App;
