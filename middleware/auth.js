const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	const token = req.header("x-auth-token");

	// Verify token
	try {
		jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
			if (error) {
				return res.status(401).json({ msg: "Token is not valid" });
			} else {
				req.user = decoded.user;
				next();
			}
		});
	} catch (err) {
		console.error("something wrong with auth middleware");
		res.status(500).json({ msg: "Server Error" });
	}
}

module.exports = auth;
