let express = require("express");
let mongoose = require("mongoose");
let path = require("path");
let cors = require("cors");
let morgan = require("morgan");
let config = require("./config");

// routes
// let authRoutes = require('./routes/api/auth');
let pomodoroRoutes = require("./routes/api/pomodoros");
let userRoutes = require("./routes/api/users");

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan("dev"));
// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	}) // Adding new mongo url parser
	.then(() => console.log("MongoDB Connected..."))
	.catch((err) => console.log(err));

// Use Routes
app.use("/api/pomodoros", pomodoroRoutes);
app.use("/api/users", userRoutes);
// app.use('/api/auth', authRoutes);

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

module.exports = app;
