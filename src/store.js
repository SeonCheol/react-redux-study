import {applyMiddleware, createStore} from 'redux';
import modules from './modules';
import {createLogger} from 'redux-logger'
// import ReduxThunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

const pm = promiseMiddleware({
    promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
})

const store = createStore(modules, applyMiddleware(createLogger(), pm))

export default store;