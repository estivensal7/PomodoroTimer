import React, { useState, useEffect } from "react";
import {
	Container,
	ListGroup,
	ListGroupItem,
	Button,
	Row,
	Col,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
	getPomodorosByUser,
	deletePomodoro,
	updateStatus,
} from "../../actions/pomodoroActions";
import PropTypes from "prop-types";

const PomodoroList = ({
	getPomodorosByUser,
	updateStatus,
	deletePomodoro,
	pomodoro: { pomodoros },
}) => {
	useEffect(() => {
		getPomodorosByUser();
	}, [getPomodorosByUser]);

	const setPriorityColor = (priority, status) => {
		let priorityColor = "";

		if (status !== "complete") {
			if (priority === "Low") {
				priorityColor = "info";
			}

			if (priority === "Moderate") {
				priorityColor = "warning";
			}

			if (priority === "High") {
				priorityColor = "danger";
			}
		} else {
			priorityColor = "success";
		}

		return priorityColor;
	};

	return (
		<div>
			<Container id="pomodoro-list-container">
				<ListGroup>
					<TransitionGroup className="pomodoro-list">
						{pomodoros.map(({ _id, text, status, priority }) => {
							if (status === "incomplete") {
								return (
									<CSSTransition
										key={_id}
										timeout={500}
										classNames="fade">
										<Row>
											<Col md={10}>
												<ListGroupItem
													color={setPriorityColor(
														priority,
														status
													)}>
													{text}
												</ListGroupItem>
											</Col>
											<Col md={1}>
												<Button
													className="remove-btn mr-auto"
													color="danger"
													size="sm"
													onClick={() =>
														deletePomodoro(_id)
													}>
													<i className="far fa-trash-alt" />
												</Button>
											</Col>
											<Col md={1}>
												<Button
													className="complete-btn"
													color="success"
													size="sm"
													onClick={() =>
														updateStatus(_id)
													}>
													{" "}
													<i className="fas fa-check" />
												</Button>
											</Col>
										</Row>
									</CSSTransition>
								);
							}
						})}
					</TransitionGroup>
				</ListGroup>
			</Container>
		</div>
	);
};

PomodoroList.propTypes = {
	getPomodorosByUser: PropTypes.func.isRequired,
	updateStatus: PropTypes.func.isRequired,
	deletePomodoro: PropTypes.func.isRequired,
	pomodoro: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	pomodoro: state.pomodoro,
});

export default connect(mapStateToProps, {
	getPomodorosByUser,
	updateStatus,
	deletePomodoro,
})(PomodoroList);
