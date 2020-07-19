import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AddPomodoro from "../../Components/AddPomodoro/";
import PomodoroList from "../../Components/PomodoroList";
import { Container, Col, Row } from "reactstrap";
import Cards from "../../Components/Cards";
import Timer from "../../Components/Timer";
import backgroundImage from "../../assets/pomodoro-background-home.jpg";

const Dashboard = ({ auth }) => {
	return (
		<div
			className="dashboard-container"
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				height: "90vh",
			}}>
			<Container>
				<Row>
					<Col md={{ size: 8, offset: 2 }}>
						<div id="timer-card-container">
							<Cards
								background="#111"
								textColor="#ddd"
								stripeColor="#DC3446"
								children={<Timer />}
							/>
						</div>
					</Col>
				</Row>
				<Row>
					<Col md={{ size: 10, offset: 1 }}>
						<AddPomodoro id="add-pomodoro-container" />
					</Col>
				</Row>
				<Row>
					<Col md={{ size: 8, offset: 2 }}>
						<PomodoroList id="pomodoro-list-container" />
					</Col>
				</Row>
			</Container>
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
