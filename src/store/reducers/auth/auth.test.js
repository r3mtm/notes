import * as actionTypes from '../../actions/actionTypes';
import { reducer, initialState } from './auth';

describe('auth Reducer', () => {

    test('should return initialState when no action and state is passed', () => {
        const newState = reducer(undefined, {});
        expect(newState).toEqual(initialState);
    });

    test('should return the new state upon receiving the action type `AUTH_USER_START`', () => {
        const newState = reducer(initialState, { type: actionTypes.AUTH_USER_START });
        expect(newState).toEqual({ ...initialState, logging: true, authCheckComplete: false });
    });

    test('should return the state upon receiving the action type `AUTH_USER_SUCCESS`', () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const payload = { expiresOn: date, userId: 'user1' };
        const newState = reducer(initialState, { type: actionTypes.AUTH_USER_SUCCESS, payload: payload });
        expect(newState).toEqual({ ...initialState, ...payload, logging: false, error: null, authCheckComplete: true });
    });

    test('should return the new state upon receiving the action type `AUTH_USER_FAILED`', () => {
        const error = "Error made for testing";
        const payload = { logging: false, authCheckComplete: true, error: error };
        const newState = reducer(initialState, { type: actionTypes.AUTH_USER_FAILED, payload: error });
        expect(newState).toEqual({ ...initialState, ...payload });
    });

    test('should return the new state upon receiving the action type `AUTH_USER_LOGOUT`', () => {
        const newState = reducer(initialState, { type: actionTypes.AUTH_USER_LOGOUT });
        expect(newState).toEqual({ ...initialState });
    });

    test('should return the new state upon receiving the action type `AUTH_ERROR_RESET`', () => {
        const newState = reducer(initialState, { type: actionTypes.AUTH_ERROR_RESET });
        expect(newState).toEqual({ ...initialState, error: null });
    });


});