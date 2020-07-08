import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Importing Router Component && Navigation Bar
import Navigation from "./Components/Navigation";
import Home from "./Pages//Home";
import Routes from "./Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import setAuthToken from "./Utils/setAuthToken";
import Alerts from "./Components/Alerts/";

const App = () => {
	useEffect(() => {
		setAuthToken(localStorage.token);
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navigation />
					<Alerts />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
