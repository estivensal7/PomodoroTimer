import React from "react";
import {
	Container,
	Jumbotron,
	Card,
	Button,
	CardTitle,
	CardText,
	Row,
	Col,
} from "reactstrap";
import { Link } from "react-router-dom";

import backgroundImage from "../../assets/pomodoro-background-home.jpg";

const Home = () => {
	return (
		<div
			className="home-container"
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				height: "90vh",
			}}>
			<Jumbotron fluid id="home-jumbotron">
				<Container fluid>
					<h1 className="display-3">Pomodoro Timer</h1>
					<p className="lead">
						Begin working with time instead, instead of struggling
						against it!
					</p>
					<hr className="my-2" />
					<p className="lead">What is the "Pomodoro Technique"?</p>
					<p className="lead">
						Each 'pomodoro' is a 25-minute time slot allocated to a
						particular task. Create a pomodoro for each task that
						you plan to complete throughout your day.
					</p>
					<p className="lead">
						After each pomodoro, take a 5-minute break! Once you've
						completed 4 pomodoros, take a 20-minute break. Your
						brain will use this time to rest before the next round
						of pomodoros. This is crucial for maximum efficiency!
					</p>
				</Container>
			</Jumbotron>
			<Row>
				<Col md={{ size: 4, offset: 2 }}>
					<Card body className="home-card">
						<CardTitle>Already have an account?</CardTitle>
						<Link to="/login" className="home-link">
							<Button outline block>
								Sign in!
							</Button>
						</Link>
					</Card>
				</Col>
				<Col md={4}>
					<Card body className="home-card">
						<CardTitle>Don't have an account?</CardTitle>
						<Link to="/register" className="home-link">
							<Button outline block>
								Register for an account!
							</Button>
						</Link>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Home;
