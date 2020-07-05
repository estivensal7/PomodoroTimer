import React, { Component } from "react";
import "./App.css";

// Importing Redux Provider && Store
import { Provider } from "react-redux";
import store from "./store";

// Importing Pages && Components
import Navigation from "./Components/Navigation";
import PomodoroList from "./Components/PomodoroList";
import Authentication from "./Pages//Authentication";

//Importing actions
import { loadUser } from "./actions/authActions";

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser);
	}

	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<Navigation />
					{/* <PomodoroList /> */}
					{/* <Authentication /> */}
				</div>
			</Provider>
		);
	}
}

export default App;
