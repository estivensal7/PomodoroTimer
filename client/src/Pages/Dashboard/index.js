import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = ({ auth }) => {
	return <h1>Dashboard</h1>;
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(Dashboard);
