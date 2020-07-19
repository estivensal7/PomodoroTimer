import {
	ADD_POMODORO,
	DELETE_POMODORO,
	GET_POMODOROS_BY_USER,
	UPDATE_POMODORO_STATUS,
} from "./types";
import api from "../Utils/api";
import { setAlert } from "./alertActions";

export const getPomodorosByUser = () => async (dispatch) => {
	try {
		const res = await api.get("/pomodoros");

		dispatch({
			type: GET_POMODOROS_BY_USER,
			payload: res.data,
		});
	} catch (err) {
		//   dispatch({
		// 	type: GET_ERRORS,
		// 	payload: { msg: err.response.statusText, status: err.response.status }
		//   });
	}
};

// Add post
export const addPomodoro = (formData) => async (dispatch) => {
	try {
		const res = await api.post("/pomodoros", formData);

		dispatch({
			type: ADD_POMODORO,
			payload: res.data,
		});

		dispatch(setAlert("Pomodoro Created", "success"));
	} catch (err) {
		//   dispatch({
		// 	type: POST_ERROR,
		// 	payload: { msg: err.response.statusText, status: err.response.status }
		//   });
	}
};

export const updateStatus = (id) => async (dispatch) => {
	try {
		const res = await api.put(`/pomodoros/${id}`, { status: "complete" });

		dispatch({
			type: UPDATE_POMODORO_STATUS,
			payload: { id, status: "complete" },
		});

		dispatch(setAlert("Pomodoro Completed!", "success"));
	} catch (err) {
		//   dispatch({
		// 	type: POST_ERROR,
		// 	payload: { msg: err.response.statusText, status: err.response.status }
		//   });
	}
};

export const deletePomodoro = (id) => async (dispatch) => {
	try {
		await api.delete(`/pomodoros/${id}`);

		dispatch({
			type: DELETE_POMODORO,
			payload: id,
		});

		dispatch(setAlert("Pomodoro Removed.", "success"));
	} catch (err) {
		// dispatch({
		//   type: POST_ERROR,
		//   payload: { msg: err.response.statusText, status: err.response.status }
		// });
	}
};
