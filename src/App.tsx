import { Router } from "@reach/router";
import React from "react";
import CreatePage from "./components/CreatePage";
import LoginPage from "./components/LoginPage";
import PiecesPage from "./components/PiecesPage";
import RandomPage from "./components/RandomPage";
import SignoutPage from "./components/SignoutPage";

const App = () => {
	return (
		<Router>
			<RandomPage default path="/random" />
			<PiecesPage path="/all" />
			<CreatePage path="/create" />
			<LoginPage path="/login" />
			<SignoutPage path="/logout" />
		</Router>
	);
};

export default App;