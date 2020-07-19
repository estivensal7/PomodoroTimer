import {
	ADD_POMODORO,
	DELETE_POMODORO,
	POMODOROS_LOADING,
	GET_POMODOROS_BY_USER,
	UPDATE_POMODORO_STATUS,
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
		case UPDATE_POMODORO_STATUS:
			return {
				...state,
				pomodoros: state.pomodoros.map((pomodoro) =>
					pomodoro._id === action.payload.id
						? { ...pomodoro, status: action.payload.status }
						: pomodoro
				),
				loading: false,
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
