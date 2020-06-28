const { Router } = require("express");
// const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
// User Model
const User = require("../../models/User.js");

const router = Router();

/**
 * @route   POST api/users
 * @desc    Register New User
 * @access  Public
 */

router.post("/", (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	//Simple Validation
	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields." });
	}

	//Check for existing user
	User.findOne({ email }).then((user) => {
		if (this.user)
			return res.status(400).json({ msg: "User already exists." });

		const newUser = new User({
			firstName,
			lastName,
			email,
			password,
		});

		//Create salt & hash password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;

				newUser.save().then((user) => {
					res.json({
						user: {
							id: user.id,
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.email,
						},
					});
				});
			});
		});
	});
});

module.exports = router;
