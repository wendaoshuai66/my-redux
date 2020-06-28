const loggerMiddleware = store => next => action => {
    console.log('this state', store.getState())
    next(action);
    console.log('next state', store.getState())
    console.log('✨✨✨✨======')
}
export default loggerMiddleware;