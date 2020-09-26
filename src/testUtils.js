import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import noteReducer from './store/reducers/notes/notes';
import authReducer from './store/reducers/auth/auth';
import msgReducer from './store/reducers/message/message';
import notesList from './store/reducers/notelist/notelist';
import todosList from './store/reducers/todolist/todolist';

const rootReducer = combineReducers({
    note: noteReducer,
    auth: authReducer,
    message: msgReducer,
    notelist: notesList,
    todolist: todosList
});

/**
 * Return node(s) with specified `data-test` attribute
 * 
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {String} val - Value of the data-test attribute
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
}

/**
 * Return node(s) with specified `CSS id` selector
 * 
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {String} val - Value of the CSS id selector
 * @returns {ShallowWrapper}
 */
export const findByIdSelector = (wrapper, val) => {
    return wrapper.find(`#${val}`);
}

/**
 * Return node(s) with specified `CSS class` selector
 * 
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {String} val - Value of the CSS id selector
 * @returns {ShallowWrapper}
 */
export const findByClassSelector = (wrapper, val) => {
    return wrapper.find(`.${val}`);
}

/**
 * Function to check the `prop types` of the component given
 * 
 * @param {JSX} component 
 * @param {Object} props 
 */
export const checkProps = (component, props) => {
    const propError = checkPropTypes(component.propTypes, props, 'prop', component.name);
    expect(propError).toBeUndefined();
}

/**
 * Create a testing store with imported reducers, middleware and initialState state.
 * 
 * @param {object} initialState - Initial state for store
 * @function storeFactory
 * @returns {Store} - Redux store.
 */
export const storeFactory = (initialState) => {
    // return createStore(rootReducer, initialState, applyMiddleware(thunk));
    // createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    const storeWithMiddleware = applyMiddleware(thunk)(createStore);
    return storeWithMiddleware(rootReducer, initialState);
}

/**
 * Function to add days to the date
 * 
 * @function addDays
 * @param {Date} - Date to add to
 * @param {Number} - Number of days to add
 * @returns {Date}
 */
export const addDays = (date, days) => {
    const copyDate = new Date(Number(date));
    copyDate.setDate(date.getDate() + days);
    return copyDate;
}

/**
 * Function to mock localStorage object and its functions
 *      based on the input given
 * 
 * @function mockLocalStorage
 * @param {String} token - Mock JWT auth token
 * @param {Date} expiresOn - Mock token expiry date
 * @param {String} userId - Mock user id
 * @returns {undefined}
 */
export const mockLocalStorage = (token, expiresOn, userId) => {
    Object.defineProperty(window, 'localStorage', {
        value: {
            getItem: jest.fn((item) => {
                if (item === 'token') {
                    return token;
                } else if (item === 'expiresOn') {
                    return expiresOn;
                } else if (item === 'userId') {
                    return userId;
                }
            }),
            removeItem: jest.fn(() => null),
            setItem: jest.fn(() => null)
        },
        writable: true
    })
}

export const sampleNotes = [
    { noteId: '123', noteHeading: 'Heading 1' },
    { noteId: '456', noteHeading: 'Heading 2' },
    { noteId: '789', noteHeading: 'Heading 2' },
    { noteId: '467', noteHeading: 'Heading 4' },
]

export const goodKey = '3b57dafd3e982d351542a5f551864852e10e2815b18af7539bebfabcc30bf053U2FsdGVkX19JxSghJH1iQZhoyHtSWMHqYPQM8gbkgnrhaKUWcSknGPAlxoxA2jSuF7SPMdN40wUvN+lBapQlTDIHtnsCuH8Kn0bLWlOxZWDpHZzyw8TT1yYMpTeMaXx2';
export const tamperedKey = 'd350a1409e9814339e52e0fecfb10141f15b5754dea98811c942900b3ef3719dU2FsdGVkX1+RTgr7umdGwvZR6BetBeyWOAJKjLztPcILsJ0eNh4Cf6O9venzjWEf8gofUV9lDX9uH8slp6PYliuOU2xbnM/UZqk3gJS/XGKz+PzkunRIsM4coV4u/i6U';
export const validDecryptedKey = 'c1d5aecca0d635eda02069d6fe5d7b00c3f6d4691cfcec12db18997539739f1b';