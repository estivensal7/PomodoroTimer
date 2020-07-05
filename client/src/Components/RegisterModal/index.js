import React, { useState, useEffect, useCallback } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	NavLink,
	Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions//errorActions";
import PropTypes from "prop-types";

const RegisterModal = ({ isAuthenticated, error, register, clearErrors }) => {
	const [modal, setModal] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState(null);

	const handleToggle = useCallback(() => {
		// Clear errors
		clearErrors();
		setModal(!modal);
	}, [clearErrors, modal]);

	const handleChangeFirstName = (e) => setFirstName(e.target.value);
	const handleChangeLastName = (e) => setLastName(e.target.value);
	const handleChangeEmail = (e) => setEmail(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		// Create user object
		const user = {
			firstName,
			lastName,
			email,
			password,
		};

		// Attempt to login
		register(user);
	};

	useEffect(() => {
		// Check for register error
		if (error.id === "REGISTER_FAIL") {
			setMsg(error.msg.msg);
		} else {
			setMsg(null);
		}

		// If authenticated, close modal
		if (modal) {
			if (isAuthenticated) {
				handleToggle();
			}
		}
	}, [error, handleToggle, isAuthenticated, modal]);

	return (
		<div>
			<NavLink onClick={handleToggle} href="#">
				Register
			</NavLink>

			<Modal isOpen={modal} toggle={handleToggle}>
				<ModalHeader toggle={handleToggle}>Register</ModalHeader>
				<ModalBody>
					{msg ? <Alert color="danger">{msg}</Alert> : null}
					<Form onSubmit={handleOnSubmit}>
						<FormGroup>
							<Label for="firstName">First Name</Label>
							<Input
								type="text"
								name="firstName"
								id="firstName"
								placeholder="First Name"
								className="mb-3"
								onChange={handleChangeFirstName}
							/>

							<Label for="lastName">Last Name</Label>
							<Input
								type="text"
								name="lastName"
								id="lastName"
								placeholder="Last Name"
								className="mb-3"
								onChange={handleChangeLastName}
							/>

							<Label for="email">Email</Label>
							<Input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								className="mb-3"
								onChange={handleChangeEmail}
							/>

							<Label for="password">Password</Label>
							<Input
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								className="mb-3"
								onChange={handleChangePassword}
							/>
							<Button
								color="dark"
								style={{ marginTop: "2rem" }}
								block>
								Register
							</Button>
						</FormGroup>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(
	RegisterModal
);
