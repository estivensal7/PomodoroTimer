import React from "react";
import { Card, CardTitle, CardText, Row, Col } from "reactstrap";

const Cards = ({ background, header, textColor, stripeColor, children }) => {
	return (
		<Row>
			<Col>
				<Card
					body
					className="cards"
					style={{
						backgroundColor: background,
						color: textColor,
						borderRight: `15px solid ${stripeColor}`,
						borderRadius: "0px",
						boxShadow: "0px 2px 4px #222",
					}}>
					<CardTitle>{header}</CardTitle>
					{children}
				</Card>
			</Col>
		</Row>
	);
};

export default Cards;
