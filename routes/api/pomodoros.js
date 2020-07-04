const { Router } = require("express");
const auth = require("../../middleware/auth.js");
// Pomodoro Model
const Pomodoro = require("../../models/Pomodoro.js");

const router = Router();

/**
 * @route   GET api/pomodoros
 * @desc    Get All Pomodoros
 * @access  Public
 */

router.get("/", async (req, res) => {
	try {
		const pomodoros = await Pomodoro.find();
		if (!pomodoros) throw Error("No items");

		res.status(200).json(pomodoros);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

/**
 * @route   GET api/pomodoros/user/:user_id
 * @desc    Get All Pomodoros by user_id
 * @access  Private
 */

router.get("/user/:user_id", auth, async (req, res) => {
	try {
		const pomodoros = await Pomodoro.find({ user_id: req.params.user_id });
		if (!pomodoros) throw Error("No items");

		res.status(200).json(pomodoros);
	} catch (e) {
		res.status(400).json({ msg: e.message });
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

/**
 * @route   POST api/pomodoros
 * @desc    Create A Pomodoro
 * @access  Private
 */

router.post("/", auth, async (req, res) => {
	const newPomodoro = new Pomodoro({
		text: req.body.text,
		user_id: req.body.user_id,
	});

	try {
		const pomodoro = await newPomodoro.save();
		if (!pomodoro) throw Error("Something went wrong saving the item");

		res.status(200).json(pomodoro);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

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

router.delete("/:id", auth, async (req, res) => {
	try {
		const pomodoro = await Pomodoro.findById(req.params.id);
		if (!pomodoro) throw Error("No item found");

		const removed = await pomodoro.remove();
		if (!removed)
			throw Error("Something went wrong while trying to delete the item");

		res.status(200).json({ success: true });
	} catch (e) {
		res.status(400).json({ msg: e.message, success: false });
	}
});

module.exports = router;
