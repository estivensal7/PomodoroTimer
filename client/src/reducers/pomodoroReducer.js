import {
	ADD_POMODORO,
	DELETE_POMODORO,
	POMODOROS_LOADING,
	GET_POMODOROS_BY_USER,
} from "../actions/types.js";

const initialState = {
	pomodoros: [],
	loading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_POMODOROS_BY_USER:
			return {
				...state,
				pomodoros: action.payload,
				loading: false,
			};
		case DELETE_POMODORO:
			return {
				...state,
				pomodoros: state.pomodoros.filter(
					(pomodoro) => pomodoro._id !== action.payload
				),
			};
		case ADD_POMODORO:
			return {
				...state,
				pomodoros: [action.payload, ...state.pomodoros],
			};
		case POMODOROS_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
