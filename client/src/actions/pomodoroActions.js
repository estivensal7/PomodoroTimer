import axios from "axios";
import {
	POMODOROS_LOADING,
	GET_POMODOROS,
	ADD_POMODORO,
	DELETE_POMODORO,
} from "./types";

export const getPomodoros = () => (dispatch) => {
	dispatch(setPomodorosLoading());
	axios.get(`/api/pomodoros/`).then((res) => {
		console.log(res.data);
		dispatch({
			type: GET_POMODOROS,
			payload: res.data,
		});
	});
};

export const addPomodoro = (pomodoro) => (dispatch) => {
	axios.post("/api/pomodoros", pomodoro).then((res) =>
		dispatch({
			type: ADD_POMODORO,
			payload: res.data,
		})
	);
};

export const deletePomodoro = (id) => (dispatch) => {
	axios.delete(`api/pomodoros/${id}`).then((res) =>
		dispatch({
			type: DELETE_POMODORO,
			payload: id,
		})
	);
};

export const setPomodorosLoading = () => {
	return {
		type: POMODOROS_LOADING,
	};
};
