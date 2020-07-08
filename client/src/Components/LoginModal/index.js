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
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions//errorActions";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const LoginModal = ({ isAuthenticated, error, login, clearErrors }) => {
	const [modal, setModal] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState(null);

	const handleToggle = useCallback(() => {
		// Clear errors
		clearErrors();
		setModal(!modal);
	}, [clearErrors, modal]);

	const handleChangeEmail = (e) => setEmail(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const userCredentials = {
			email,
			password,
		};

		// Attempt to login
		login(userCredentials);
	};

	useEffect(() => {
		// Check for login error
		if (error.id === "LOGIN_FAIL") {
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

	//Redirect If Logged In
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<div>
			<NavLink onClick={handleToggle} href="#">
				Log In
			</NavLink>

			<Modal isOpen={modal} toggle={handleToggle}>
				<ModalHeader toggle={handleToggle}>Log In</ModalHeader>
				<ModalBody>
					{msg ? <Alert color="danger">{msg}</Alert> : null}
					<Form onSubmit={handleOnSubmit}>
						<FormGroup>
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
								Log In
							</Button>
						</FormGroup>
					</Form>
				</ModalBody>
			</Modal>
		</div>
	);
};

LoginModal.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	error: PropTypes.object,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
