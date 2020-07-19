import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";

function Timer() {
	const [minutes, updateMinutes] = useState(0);
	const [seconds, updateSeconds] = useState(0);

	useEffect(() => {
		let myInterval = setInterval(() => {
			if (seconds > 0) {
				updateSeconds(seconds - 1);
				document.title = `React Pomodoro (${minutes}:${seconds})`;
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval);
					document.title = `React Pomodoro`;
				} else {
					updateMinutes(minutes - 1);
					updateSeconds(59);
					document.title = `React Pomodoro (${minutes}:${seconds})`;
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});

	const setTimer = (time) => {
		if (time === "twenty-five") {
			updateMinutes(24);
			updateSeconds(59);
		}

		if (time === "twenty") {
			updateMinutes(19);
			updateSeconds(59);
		}

		if (time === "five") {
			updateMinutes(4);
			updateSeconds(59);
		}
	};

	return (
		<div>
			<Row>
				<Col md={{ size: 3, offset: 1 }}>
					<Button
						onClick={() => setTimer("twenty-five")}
						color="success"
						outline>
						25 Minute Timer
					</Button>
				</Col>
				<Col md={3}>
					<Button
						onClick={() => setTimer("five")}
						color="danger"
						outline>
						5 Minute Timer
					</Button>
				</Col>
				<Col md={3}>
					<Button
						onClick={() => setTimer("twenty")}
						color="primary"
						outline>
						20 Minute Timer
					</Button>
				</Col>
			</Row>
			<Row>
				<Col md={{ size: 4, offset: 4 }}>
					{minutes === 0 && seconds === 0 ? null : (
						<h1>
							{" "}
							{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
						</h1>
					)}
				</Col>
			</Row>
		</div>
	);
}

export default Timer;
