import React, { useState, Fragment } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	NavbarText,
} from "reactstrap";

import Logout from "../Logout";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

const Navigation = ({ auth, logout }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);
	const { isAuthenticated, user } = auth;

	const authLinks = (
		<Fragment>
			<NavbarText>
				<span className="navbar-text mr-3">
					<strong>{user ? `Hi, ${user.firstName}!` : ""}</strong>
				</span>
			</NavbarText>
			<NavLink onClick={logout} href="#!">
				<i className="fas fa-sign-out-alt" />{" "}
				<span className="hide-sm">Logout</span>
			</NavLink>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<NavLink href="/register">Register</NavLink>
			<NavLink href="/login">Login</NavLink>
		</Fragment>
	);

	return (
		<div>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand href="/">Pomodoro Timer</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						{isAuthenticated ? authLinks : guestLinks}
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
