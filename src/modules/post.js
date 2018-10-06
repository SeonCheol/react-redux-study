import {handleActions, createAction} from 'redux-actions'
import {Map} from 'immutable'
import axios from 'axios'

function getPostAPI(postId) {
    return axios.get(`http://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST'
const GET_POST_PENDING = 'GET_POST_PENDING'
const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
const GET_POST_FAILURE = 'GET_POST_FAILURE'

const getPostPending = createAction(GET_POST_PENDING)
const getPostSuccess = createAction(GET_POST_SUCCESS)
const getPostFailure = createAction(GET_POST_FAILURE)

/* redux thunk getPost
export const getPost = (postId) => dispatch => {
    dispatch(getPostPending())

    return getPostAPI(postId).then((response) => {
        dispatch(getPostSuccess(response))
        return response
    }).catch(err => {
        dispatch(getPostFailure(err))
        throw err
    })
}
*/

/* promise middleware */
export const getPost = (postId) => ({
    type: GET_POST,
    payload: getPostAPI(postId)
})

const initialState = Map({
    pending: false,
    error: false,
    data: {
        title: '',
        body: '',
    }
})

export default handleActions({
    [GET_POST_PENDING]: (state, action) => {
        return state.set('pending', true)
    },
    [GET_POST_SUCCESS]: (state, action) => {
        const {title, body} = action.payload.data
        const data = {title, body}
        return state.set('data', data)
            .set('pending', false)
    },
    [GET_POST_FAILURE]: (state, action) => {
        return state.set('pending', false)
            .set('error', true)
    }
}, initialState)