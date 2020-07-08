import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";

import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		login({ email, password });
	};

	// if (isAuthenticated) {
	// 	return <Redirect to="/dashboard" />;
	// }

	return (
		<Fragment>
			<Container>
				<h1 className="large text-primary">Log In</h1>
				<p className="lead">
					<i className="fas fa-user" /> Sign In To Your Account
				</p>
				<Form onSubmit={onSubmit}>
					<FormGroup>
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
						<Button
							color="dark"
							style={{ marginTop: "2rem" }}
							block>
							Log In
						</Button>
					</FormGroup>
				</Form>
				<p className="my-1">
					Don't have an account? <Link to="/register">Sign Up</Link>
				</p>
			</Container>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
