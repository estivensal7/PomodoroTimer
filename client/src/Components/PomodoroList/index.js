import React, { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
	getPomodorosByUser,
	// deletePomodoro,
} from "../../actions/pomodoroActions";
import PropTypes from "prop-types";

const PomodoroList = ({
	// deletePomodoro,
	getPomodorosByUser,
	pomodoro: { pomodoros },
}) => {
	useEffect(() => {
		getPomodorosByUser();
	}, [getPomodorosByUser]);

	// onDeleteClick = (id) => {
	// 	this.props.deletePomodoro(id);
	// };

	const setPriorityColor = (priority) => {
		let priorityColor = "";

		if (priority === "Low") {
			priorityColor = "info";
		}

		if (priority === "Moderate") {
			priorityColor = "warning";
		}

		if (priority === "High") {
			priorityColor = "danger";
		}

		return priorityColor;
	};

	return (
		<div>
			<Container>
				<ListGroup>
					<TransitionGroup className="pomodoro-list">
						{pomodoros.map(({ _id, text, status, priority }) => {
							return (
								<CSSTransition
									key={_id}
									timeout={500}
									classNames="fade">
									<ListGroupItem
										color={setPriorityColor(priority)}>
										{text}
										<Button
											className="remove-btn"
											color="danger"
											size="sm">
											&times;
										</Button>
									</ListGroupItem>
								</CSSTransition>
							);
						})}
					</TransitionGroup>
				</ListGroup>
			</Container>
		</div>
	);
};

PomodoroList.propTypes = {
	getPomodorosByUser: PropTypes.func.isRequired,
	// deletePomodoro: PropTypes.func.isRequired,
	pomodoro: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	pomodoro: state.pomodoro,
});

export default connect(mapStateToProps, { getPomodorosByUser })(PomodoroList);
