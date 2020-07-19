import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../Utils/protected-route.js";

// Importing Pages
import Login from "../Pages/Login/";
import Register from "../Pages//Register/";
import Dashboard from "../Pages/Dashboard";
import FourOFour from "../Pages/FourOFour";
import CompletedPomodoros from "../Pages/CompletedPomodoros/";

const Routes = (props) => (
	<Switch>
		<Route exact path="/login" component={Login} />
		<Route exact path="/register" component={Register} />
		<ProtectedRoute exact path="/dashboard" component={Dashboard} />
		<ProtectedRoute
			exact
			path="/completed-pomodoros"
			component={CompletedPomodoros}
		/>
		<Route component={FourOFour} />
	</Switch>
);
export default Routes;
