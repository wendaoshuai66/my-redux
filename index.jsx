import React from "react";
import HooksRedux from "./hooks-redux";
const { Provider, store } = HooksRedux({
    initialState: { name: "wendaoshuai🏮", age: 0 }
})
function timeoutAdd(a) {
    return new Promise(cb => setTimeout(() => cb(a + 1), 500));
}

//异步的Action
const actionAdd = () => async (dispatch, ownState) => {
    const age = await timeoutAdd(ownState.age);
    dispatch({
        type: "asyncAdd",
        reducer(state) {
            return { ...state, age }
        }
    });
}
//同步的action
// function actionAdd() {
//     return {
//         type: "init",
//         reducer(state) {
//             return { ...state, age: state.age + 1 }
//         }
//     }
// }

function Button() {
    function handleAdd() {
        store.dispatch(actionAdd())
    }
    return <button onClick={handleAdd}>点击增加</button>
}
function Page() {
    const state = store.useContext();
    return (
        <div>
            {state.age}
            <hr />
            <Button />
        </div>
    )
}
export default function App() {
    return (
        <Provider>
            <Page />
        </Provider>
    )
}