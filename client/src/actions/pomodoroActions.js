import axios from "axios";
import {
	POMODOROS_LOADING,
	GET_POMODOROS,
	ADD_POMODORO,
	DELETE_POMODORO,
	GET_POMODOROS_BY_USER,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getPomodoros = () => (dispatch) => {
	dispatch(setPomodorosLoading());
	axios
		.get(`/api/pomodoros/`)
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: GET_POMODOROS,
				payload: res.data,
			});
		})
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const getPomodorosByUser = (userID) => (dispatch, getState) => {
	dispatch(setPomodorosLoading());
	axios
		.get(`api/pomodoros/user/${userID}`, tokenConfig(getState))
		.then((res) => {
			console.log(res.data);
			dispatch({
				type: GET_POMODOROS_BY_USER,
				payload: res.data,
			});
		})
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const addPomodoro = (pomodoro) => (dispatch, getState) => {
	axios
		.post("/api/pomodoros", pomodoro, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_POMODORO,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deletePomodoro = (id) => (dispatch, getState) => {
	axios
		.delete(`api/pomodoros/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_POMODORO,
				payload: id,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const setPomodorosLoading = () => {
	return {
		type: POMODOROS_LOADING,
	};
};
