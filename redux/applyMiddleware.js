import compose from './compose.js';
export default function applyMiddleware(...middlewares) {
    return function(createStore) {
        return function(...agrs) {
            const store = createStore(...agrs);
            let dispatch = () => {
                throw new Error('创建中不能使用dispatch')
            };
            const middlewareApi = {
                getState: store.getState,
                dispatch: (...agrs) => dispatch(...agrs)
            }
            const chain = middlewares.map(middleware => middleware(middlewareApi));
            dispatch = compose(...chain)(store.dispatch);
            store.dispatch = dispatch;
            return store;
        }
    }
}