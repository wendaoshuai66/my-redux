export default function createStore(reduce, initState, rewriteStore) {
    let currentState = initState;
    let currentReduce = reduce;
    let listeners = []
    if (typeof initState === 'function' && typeof rewriteStore === 'undefined') {
        rewriteStore = initState
        currentState = undefined
    }
    if (typeof rewriteStore !== 'undefined') {
        if (typeof rewriteStore !== 'function') {
            throw new Error('Expected the enhancer to be a function.')
        }
        if (typeof initState === 'function') {
            return rewriteStore(createStore)(reduce)
        }
        return rewriteStore(createStore)(reduce, currentState)
    }
    const subscribe = (listener) => {
        listeners.push(listener);
        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }
    const dispatch = (action) => {
        currentState = currentReduce(currentState, action);
        for (const listener of listeners) {
            listener();
        }
        return action;
    }
    const replaceReducer = (newreduce) => {
        currentReduce = newreduce;
        dispatch({
            type: Symbol(),
        })
    }
    const getState = () => currentState;
    dispatch({
        type: Symbol(),
    })

    return {
        subscribe,
        dispatch,
        getState,
        replaceReducer
    }
}