import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alertActions";
import { register } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		password2: "",
	});

	const { firstName, lastName, email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
			register({ firstName, lastName, email, password });
		}
	};

	// if (isAuthenticated) {
	// 	return <Redirect to="/dashboard" />;
	// }

	return (
		<Fragment>
			<Container>
				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">
					<i className="fas fa-user" /> Create Your Account
				</p>
				<Form onSubmit={onSubmit}>
					<FormGroup>
						<Label for="firstName">First Name</Label>
						<Input
							type="text"
							name="firstName"
							id="firstName"
							placeholder="First name"
							className="mb-3"
							onChange={onChange}
						/>

						<Label for="lastName">Last Name</Label>
						<Input
							type="text"
							name="lastName"
							id="lastName"
							placeholder="Last name"
							className="mb-3"
							onChange={onChange}
						/>

						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							className="mb-3"
							onChange={onChange}
						/>

						<Label for="password">Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							className="mb-3"
							onChange={onChange}
						/>

						<Label for="password2">Confirm Password</Label>
						<Input
							type="password"
							name="password2"
							id="password2"
							placeholder="Confirm Password"
							className="mb-3"
							onChange={onChange}
						/>

						<Button
							color="dark"
							style={{ marginTop: "2rem" }}
							block>
							Register Account
						</Button>
					</FormGroup>
				</Form>
				<p className="my-1">
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</Container>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
