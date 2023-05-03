import {applyMiddleware, compose, createStore} from 'redux'
//thunk中间件处理异步逻辑 （考虑使用RTK进行重构）
import thunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;
