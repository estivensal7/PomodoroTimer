import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
	getPomodorosByUser,
	deletePomodoro,
} from "../../actions/pomodoroActions";
import PropTypes from "prop-types";

class PomodoroList extends Component {
	componentDidMount() {
		const { user } = this.props.auth;
		this.props.getPomodorosByUser(user.id);
	}

	onDeleteClick = (id) => {
		this.props.deletePomodoro(id);
	};

	render() {
		const { pomodoros } = this.props.pomodoro;

		return (
			<Container>
				<ListGroup>
					<TransitionGroup className="pomodoro-list">
						{pomodoros.map(({ _id, text, status }) => {
							return (
								<CSSTransition
									key={_id}
									timeout={500}
									classNames="fade">
									<ListGroupItem>
										<Button
											className="remove-btn"
											color="danger"
											size="sm"
											onClick={this.onDeleteClick.bind(
												this,
												_id
											)}>
											&times;
										</Button>
										{text}
									</ListGroupItem>
								</CSSTransition>
							);
						})}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

PomodoroList.propTypes = {
	getPomodorosByUser: PropTypes.func.isRequired,
	deletePomodoro: PropTypes.func.isRequired,
	pomodoro: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	pomodoro: state.pomodoro,
	auth: state.auth,
});

export default connect(mapStateToProps, { getPomodorosByUser, deletePomodoro })(
	PomodoroList
);
