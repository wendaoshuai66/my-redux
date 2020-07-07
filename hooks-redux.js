import React from "react";
const {
    useReducer,
    useContext,
    createContext
} = React;
//中间件 日志中间件
function middleWareLog(store, lastState, nextState, action) {
    console.log(action.type);
    console.log("🐶last--->", lastState);
    console.log("🐶next--->", nextState);
}

function reducerInAction(state, action) {
    if (typeof action.reducer == "function") {
        return action.reducer(state);
    }
    return state;
}
export default function createStore(params) {
    //全局的数据的传递管理
    const Appcontext = createContext();
    const {
        initialState,
        reducer,
        middleware
    } = {
        reducer: reducerInAction,
        middleware: [middleWareLog],
        ...params,
    }
    //新版的redux状态管理机制
    const store = {
            _state: initialState,
            dispatch: undefined,
            getState: () => {
                return store._state;
            },
            useContext: () => {
                return useContext(Appcontext)
            }
        }
        //这里是处理action reducer集中处理营
    const middleWareReducer = (lastState, action) => {
        // switch (action.type) {
        //     case "init":
        //         return {
        //             ...lastState,
        //             age: lastState.age + 1
        //         }
        //     default:
        //         return {
        //             ...lastState
        //         }
        // }
        //实现reducer in action
        if (!Array.isArray(middleware)) {
            throw new Error("middleware必须是数组")
        }
        let nextState = reducer(lastState, action);
        for (let item of middleware) {
            const newState = item(store, lastState, nextState, action);
            if (newState) {
                nextState = newState;
            }
        }
        store._state = nextState;
        return nextState;
    }
    const Provider = props => {
        const [state, dispatch] = useReducer(middleWareReducer, initialState);
        if (!store.dispatch) {
            store.dispatch = async(action) => {
                if (typeof action == "function") {
                    await action(dispatch, store._state);
                } else {
                    dispatch(action);
                }

            }
        }
        return <Appcontext.Provider {
            ...props
        }
        value = {
            state
        }
        />
    }
    return {
        Provider,
        store
    }
}