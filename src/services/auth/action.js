import { remove, save } from 'react-cookies';
import store from '../../store';
import * as types from './action-types';
import _isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../user-details/action';

export const logIn = (data) => {
	store.dispatch(getUserDetails(data));
	return {
		type: types.LOG_IN
	};
};
export const logOut = () => {
	remove('session');
	store.dispatch({ type: 'CLEAR_DATA' });
	return {
		type: types.LOG_OUT
	};
};
