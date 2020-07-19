import React, { useState } from "react";
import {
	InputGroup,
	InputGroupAddon,
	Button,
	Input,
	InputGroupButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPomodoro } from "../../actions/pomodoroActions";

const AddPomodoro = ({ addPomodoro }) => {
	const [formData, setFormData] = useState({
		text: "",
		status: "incomplete",
		priority: "Low",
	});

	const { text, status, priority } = formData;

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dropdownLevel, setDropdownLevel] = useState("Priority Level");

	const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		addPomodoro({ text, status, priority });
		setFormData({ ...formData, [text]: "", [priority]: "" });
		setDropdownLevel("Priority Level");
	};

	return (
		<InputGroup id="add-pomodoro-container">
			<InputGroupButtonDropdown
				addonType="append"
				isOpen={dropdownOpen}
				toggle={toggleDropDown}>
				<DropdownToggle caret>{dropdownLevel}</DropdownToggle>
				<DropdownMenu>
					<DropdownItem
						onClick={() => {
							setDropdownLevel("Low");
							setFormData({ ...formData, priority: "Low" });
						}}>
						Low
					</DropdownItem>
					<DropdownItem
						onClick={() => {
							setDropdownLevel("Moderate");
							setFormData({
								...formData,
								priority: "Moderate",
							});
						}}>
						Moderate
					</DropdownItem>
					<DropdownItem
						onClick={() => {
							setDropdownLevel("High");
							setFormData({ ...formData, priority: "High" });
						}}>
						High
					</DropdownItem>
				</DropdownMenu>
			</InputGroupButtonDropdown>
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
