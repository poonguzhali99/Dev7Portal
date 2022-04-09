import { USER_DETAILS } from './action-types';

export const userDetailsReducer = (
	state = {
		requesting: true,
		errorResponse: {},
		response: {}
	},
	{ type, payload }
) => {
	switch (type) {
		case USER_DETAILS.SET_USER_DETAILS:
			return {
				...state,
				requesting: false,
				response: payload
			};

		default:
			return state;
	}
};
