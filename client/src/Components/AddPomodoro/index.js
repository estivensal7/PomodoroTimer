import React, { useState } from "react";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPomodoro } from "../../actions/pomodoroActions";

const AddPomodoro = ({ addPomodoro }) => {
	const [formData, setFormData] = useState({
		text: "",
		status: "incomplete",
	});

	const { text, status } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		addPomodoro({ text, status });
	};

	return (
		<InputGroup>
			<Input
				onChange={onChange}
				name="text"
				placeholder="Add a new pomodoro!"
			/>
			<InputGroupAddon addonType="append">
				<Button color="success" onClick={onSubmit}>
					+
				</Button>
			</InputGroupAddon>
		</InputGroup>
	);
};

AddPomodoro.propTypes = {
	addPomodoro: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addPomodoro })(AddPomodoro);
