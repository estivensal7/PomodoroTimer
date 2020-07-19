import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import backgroundImage from "../../assets/pomodoro-background-home.jpg";
import PomodoroTable from "../../Components/PomodoroTable";

const CompletedPomodoros = ({ auth }) => {
	return (
		<div
			className="completed-pomodoros-container"
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				height: "90vh",
			}}>
			<Container>
				<PomodoroTable />
			</Container>
		</div>
	);
};

CompletedPomodoros.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(CompletedPomodoros);
