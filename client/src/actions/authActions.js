import axios from "axios";

import { setAlert } from "./alertActions";
import { returnErrors } from "./errorActions";

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	SET_ALERT,
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
	// User loading
	dispatch({ type: USER_LOADING });

	axios
		.get("/api/auth/user", tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR,
			});
		});
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
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}

	// axios
	// 	.post("/api/user", body, config)
	// 	.then((res) => {
	// 		dispatch({
	// 			type: REGISTER_SUCCESS,
	// 			payload: res.data,
	// 		});
	// 		dispatch(loadUser());
	// 	})
	// 	.catch((err) => {
	// 		dispatch(
	// 			returnErrors(
	// 				err.response.data,
	// 				err.response.status,
	// 				"REGISTER_FAIL"
	// 			)
	// 		);
	// 		dispatch({
	// 			type: REGISTER_FAIL,
	// 		});
	// 	});
};

// Setup config/headers && token
export const tokenConfig = (getState) => {
	// Get token from localstorage
	const token = getState().auth.token;

	// Headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	// if token, add to headers
	if (token) {
		config.headers["x-auth-token"] = token;
	}

	return config;
};

// Log Out User
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};

// Log In User
export const login = ({ email, password }) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// Request Body
	const body = JSON.stringify({ email, password });

	axios
		.post("/api/auth", body, config)
		.then((res) => {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
			dispatch(loadUser());
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					"LOGIN_FAIL"
				)
			);
			dispatch({
				type: LOGIN_FAIL,
			});
		});
};
