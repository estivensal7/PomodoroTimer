const auth = require("../../middleware/auth.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const checkObjectId = require("../../middleware/checkObjectId");

// Pomodoro Model
const Pomodoro = require("../../models/Pomodoro");
const User = require("../../models/User");

/**
 * @route   GET api/pomodoros/user/:user_id
 * @desc    Get All Pomodoros by user_id
 * @access  Private
 */

// router.get("/user/:user_id", auth, async (req, res) => {
// 	try {
// 		const pomodoros = await Pomodoro.find({ user_id: req.params.user_id });
// 		if (!pomodoros) throw Error("No items");

// 		res.status(200).json(pomodoros);
// 	} catch (e) {
// 		res.status(400).json({ msg: e.message });
// 	}
// });

// @route    GET api/pomodoros
// @desc     Get all posts
// @access   Private
router.get("/", auth, async (req, res) => {
	try {
		const pomodoros = await Pomodoro.find({ user_id: req.user.id }).sort({
			date: -1,
		});
		res.json(pomodoros);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

/**
 * @route   GET api/pomodoros/user/:user_id/:status
 * @desc    Get All Pomodoros by user_id & by status
 * @access  Private
 */

router.get("/user/:user_id/:status", auth, async (req, res) => {
	try {
		const pomodoros = await Pomodoro.find({
			user_id: req.params.user_id,
			status: req.params.status,
		});
		if (!pomodoros) throw Error("No items");

		res.status(200).json(pomodoros);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

// @route    POST api/pomodoros
// @desc     Create a Pomodoro
// @access   Private
router.post(
	"/",
	[auth, [check("text", "Text is required").not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");

			const newPomodoro = new Pomodoro({
				text: req.body.text,
				status: req.body.status,
				user_id: req.user.id,
				priority: req.body.priority,
			});

			const pomodoro = await newPomodoro.save();

			res.json(pomodoro);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

/**
 * @route   POST api/pomodoros/:id
 * @desc    Update A Pomodoro
 * @access  Private
 */

router.put("/:id", auth, async (req, res) => {
	try {
		const updatedPomodoro = await Pomodoro.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
		);
		if (!updatedPomodoro)
			throw Error("Something went wrong updating the item");

		res.status(200).json(updatedPomodoro);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

/**
 * @route   DELETE api/pomodoros/:id
 * @desc    Delete A Pomodoro
 * @access  Private
 */

router.delete("/:id", [auth, checkObjectId("id")], async (req, res) => {
	try {
		const pomodoro = await Pomodoro.findById(req.params.id);
		console.log(pomodoro);
		if (!pomodoro)
			return res.status(404).json({ msg: "Pomodoro not found" });

		// Check user
		if (pomodoro.user_id.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		await pomodoro.remove();

		res.json({ msg: "Pomodoro removed." });
	} catch (err) {
		console.error(err.message);

		res.status(500).send("Server Error");
	}
});

module.exports = router;
