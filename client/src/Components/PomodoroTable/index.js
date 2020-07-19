import React, { useEffect } from "react";
import { Container, Table } from "reactstrap";
import { connect } from "react-redux";
import { getPomodorosByUser } from "../../actions/pomodoroActions";
import PropTypes from "prop-types";
import moment from "moment";

const PomodoroTable = ({ getPomodorosByUser, pomodoro: { pomodoros } }) => {
	useEffect(() => {
		getPomodorosByUser();
	}, [getPomodorosByUser]);

	return (
		<div>
			<Container id="pomodoro-table-container">
				<Table dark id="pomodoro-table">
					<thead>
						<tr>
							<th>Description</th>
							<th>Date Completed</th>
						</tr>
					</thead>
					<tbody>
						{pomodoros.map(({ _id, text, status, updatedAt }) => {
							if (status === "complete") {
								return (
									<tr key={_id}>
										<td scope="row">{text}</td>
										<td>
											{moment(`${updatedAt}`).format(
												"MMM Do YY"
											)}
										</td>
									</tr>
								);
							}
						})}
					</tbody>
				</Table>
			</Container>
		</div>
	);
};

PomodoroTable.propTypes = {
	getPomodorosByUser: PropTypes.func.isRequired,
	pomodoro: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	pomodoro: state.pomodoro,
});

export default connect(mapStateToProps, {
	getPomodorosByUser,
})(PomodoroTable);
