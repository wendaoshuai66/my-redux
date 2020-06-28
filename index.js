import { createStore, combineReducers, applyMiddleware } from './redux/index.js';
import counterReducers from './reducers/counter.js';
import infoReducer from './reducers/infoReducer.js';
import loggerMiddleware from './middleware/loggerMiddleware.js';
import timeMiddleware from './middleware/timeMiddleware.js';
import thunkMiddleware from './middleware/thunkMiddleware.js';
const reduces = combineReducers({ infoReducer, counterReducers });
const store = createStore(reduces, applyMiddleware(loggerMiddleware, timeMiddleware, thunkMiddleware));
// --------- 理解中间的含义及 applyMiddleware 实现原理
// const logger = loggerMiddleware(store);
// const time = timeMiddleware(store);
// const next = store.dispatch;
// // 从这块就可以看出 中间间是对dispatch 增强
// store.dispatch = time(logger(next));

// ------结束 ---------

store.subscribe(() => {
    console.log(store.getState())
})
// store.dispatch({
//     type: 'UPDATA_INFO',
//     info: 'very good'

// })
const action = function () {
    return (dispatch, getState) => {
        dispatch({
            type: 'UPDATA_INFO',
            info: 'very good'

        })
    }
};
setTimeout(() => {
    store.dispatch(action())
}, 5000)