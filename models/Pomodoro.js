const mongoose = require("mongoose");

const { Schema } = mongoose;

const PomodoroSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},
		user_id: {
			type: Schema.ObjectId,
			required: true,
		},
		status: {
			type: String,
			default: "incomplete",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Pomodoro", PomodoroSchema);
