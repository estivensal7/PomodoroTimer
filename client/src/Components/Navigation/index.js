import React, { useState, Fragment } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavLink,
	NavbarText,
} from "reactstrap";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import pomodoro_logo from "../../assets/pomodoro_logo.PNG";

const Navigation = ({ auth: { isAuthenticated, isLoading, user }, logout }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const authLinks = (
		<Fragment>
			<NavbarText>
				<span className="mr-3">
					<strong className="navigation-text">
						{user ? `Hi, ${user.firstName}!` : ""}
					</strong>
				</span>
			</NavbarText>
			<NavLink href="/dashboard" className="navigation-link">
				<i className="fas fa-user" />{" "}
				<span className="hide-sm">Dashboard</span>
			</NavLink>
			<NavLink onClick={logout} href="#!">
				<i className="fas fa-sign-out-alt" />{" "}
				<span className="hide-sm">Logout</span>
			</NavLink>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Link to="/register" className="navigation-link">
				<NavLink>Register</NavLink>
			</Link>
			<Link to="/login" className="navigation-link">
				<NavLink>Login</NavLink>
			</Link>
		</Fragment>
	);

	return (
		<div>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand href="/">
					<img
						id="pomodoro-logo"
						src={pomodoro_logo}
						style={{ width: "60px" }}
					/>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{!isLoading && (
							<Fragment>
								{isAuthenticated ? authLinks : guestLinks}
							</Fragment>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navigation);
