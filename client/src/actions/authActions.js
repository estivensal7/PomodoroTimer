import axios from "axios";

import { setAlert } from "./alertActions";
import { returnErrors } from "./errorActions";
import setAuthToken from "../Utils/setAuthToken.js";
import api from "../Utils/api.js";

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
} from "./types";

// Check token & load user
export const loadUser = () => async (dispatch) => {
	try {
		const res = await api.get("/auth/user");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register = ({ firstName, lastName, email, password }) => async (
	dispatch
) => {
	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// Request Body
	const body = JSON.stringify({ firstName, lastName, email, password });

	try {
		const res = await axios.post("/api/user", body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// Log Out User
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};

// Log In User
export const login = ({ email, password }) => async (dispatch) => {
	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// Request Body
	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post("api//auth", body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};
