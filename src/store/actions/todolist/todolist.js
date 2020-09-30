import * as actions from '../actionTypes';
import axios from '../../../axios-notes';
import { decrypt } from '../../../utility';
import { RECORD_COUNT } from '../../reducers/todolist/todolist';


/**
 * Action creator to set the error message generated
 *      while trying to fetch todos
 * 
 * @function fetchTitlesFailed
 * @returns {Object} - Redux type
 */
export const fetchTitlesFailed = () => {
    return {
        type: actions.FETCH_TODOS_TITLES_FAILED
    };
}

/**
 * Action creator to start the spinner while 
 *      fetching todos list
 * 
 * @function fetchMoreTitleStart
 * @returns {Object} - Redux type
 */
export const fetchMoreTitleStart = () => {
    return {
        type: actions.FETCH_MORE_TODOS_START
    };
}

/**
 * Action creator to update the fetch status
 *      to success and stop the spinner
 * 
 * @function fetchTitlesSuccess
 * @returns {Object} - Redux type and payload
 */
export const fetchTitlesSuccess = (titles) => {
    return {
        type: actions.FETCH_TODOS_TITLES_SUCCESS,
        payload: titles
    }
}

/**
 * Function to fetch todo titles from server
 * 
 * @function fetchAllTodos
 * @param {number} page - Next record to fetch
 * @param {string} secretKey - Secret key for decryption
 * @returns {Function}
 */
export const fetchAllTodos = (page, secretKey) => {
    return dispatch => {
        dispatch(fetchMoreTitleStart());
        axios.get(`/todos/page/${page}/${RECORD_COUNT}`, {
            withCredentials: true
        })
            .then((response) => {
                if (response.data) {
                    const data = response.data.map((item) => {
                        return {
                            todoId: item.todoId,
                            todoTitle: decrypt(item.todoTitle, secretKey)
                        }
                    })
                    dispatch(fetchTitlesSuccess(data))
                } else {
                    dispatch(fetchTitlesFailed());
                }

            })
            .catch(() => {
                dispatch(fetchTitlesFailed());
            });
    }
}
