const router = require("express").Router();
const authRoutes = require("./auth");
const pomodoroRoutes = require("./pomodoros");
const userRoutes = require("./users");

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/pomodoros", pomodoroRoutes);

module.exports = router;
