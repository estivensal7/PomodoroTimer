import React, { Component } from "react";
import { Container, Jumbotron, Row, Col } from "reactstrap";

//Importing Components
import LoginForm from "../../Components/LoginForm";
import RegisterForm from "../../Components/RegisterForm";

class Authentication extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formType: "register",
		};
	}

	render() {
		return (
			<Container>
				<Jumbotron id="authentication-page-jumbo">
					<Row>
						<Col sm="12" md={{ size: 8, offset: 2 }}>
							{this.state.formType === "sign-in" ? (
								<LoginForm />
							) : (
								<RegisterForm />
							)}
						</Col>
					</Row>
				</Jumbotron>
			</Container>
		);
	}
}

export default Authentication;
