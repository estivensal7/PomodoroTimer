import { combineReducers } from "redux";
import pomodoroReducer from "./pomodoroReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
	pomodoro: pomodoroReducer,
	error: errorReducer,
	auth: authReducer,
	alert: alertReducer,
});
