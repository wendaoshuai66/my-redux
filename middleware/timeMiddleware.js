const timeMiddleware = store => next => action => {
    console.log('this state', new Date())
    next(action)
    console.log('next state', store)
    console.log('⏰⏰⏰⏰======');
}
export default timeMiddleware;