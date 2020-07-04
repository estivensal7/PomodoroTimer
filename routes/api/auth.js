const { Router } = require("express");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
// User Model
const User = require("../../models/User.js");

const router = Router();

/**
 * @route   POST api/auth
 * @desc    Authenticate User
 * @access  Public
 */

router.post("/", (req, res) => {
	const { email, password } = req.body;

	//Simple Validation
	if (!email || !password) {
		return res.status(400).json({ msg: "Please enter all fields." });
	}

	//Check for existing user
	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ msg: "User does not exist." });

		//compare input password to hashed password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch)
				return res.status(400).json({ msg: "Invalid Password" });

			jwt.sign(
				{ id: user.id, email: user.email },
				config.get("jwtSecret"),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;

					res.json({
						token,
						user: {
							id: user.id,
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.email,
						},
					});
				}
			);
		});
	});
});

/**
 * @route   GET api/auth/user
 * @desc    Get User Data
 * @access  Private
 */

router.get("/user", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then((user) => {
			res.json(user);
		});
});

module.exports = router;
