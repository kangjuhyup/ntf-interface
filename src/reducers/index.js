import { combineReducers } from "redux";


const wallet = {
    isConnected : false,
    address : "",
    balance : 0,
}

const walletInfo = (wallet_ = wallet, action) => {
    if(action.type === "CONNECT_WALLET") {
        return action.payload
    } else if (action.type == "GET_BALANCE") {
        return action.payload
    }
    return wallet_;
}

export default combineReducers({
    wallet : walletInfo,
})