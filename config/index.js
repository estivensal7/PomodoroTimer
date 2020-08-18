let dotenv = require("dotenv");

dotenv.config();

module.exports = {
	MONGO_URI: process.env.MONGO_URI,
	MONGO_DB_NAME: process.env.MONGO_DB_NAME,
	JWT_SECRET: process.env.JWT_SECRET,
	MONGO_USER: process.env.MONGO_USER,
	MONGO_PASSWORD: process.env.MONGO_PASSWORD,
};
