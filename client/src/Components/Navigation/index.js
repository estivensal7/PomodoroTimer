import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";

import RegisterModal from "../RegisterModal";
import LogoutModal from "../Logout";
import LoginModal from "../LoginModal/";

const Navigation = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand href="/">Pomodoro Timer</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="#">
								<RegisterModal />
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">
								<LogoutModal />
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">
								<LoginModal />
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
