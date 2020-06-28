const infoReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATA_INFO':
            return action.info;
        default:
            return state;
    }
}
export default infoReducer;