import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddPomodoro from "../../Components/AddPomodoro/";
import PomodoroList from "../../Components/PomodoroList";

const Dashboard = ({ auth }) => {
	return (
		<div>
			<h1>Dashboard</h1>
			<AddPomodoro />
			<PomodoroList />
		</div>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(Dashboard);
