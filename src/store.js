import {applyMiddleware, createStore} from 'redux';
import modules from './modules';
import {createLogger} from 'redux-logger'
import ReduxThunk from 'redux-thunk'

const store = createStore(modules, applyMiddleware(createLogger(), ReduxThunk))

export default store;