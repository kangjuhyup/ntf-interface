
import { combineReducers } from "redux";


const wallet = {
    isConnected : false,
    address : "",
    balance : 0,
    chainId : 0,
    issue : false,
}


const walletInfo = (wallet_ = wallet, action) => {
    switch(action.type) {
        case "CONNECT_WALLET" :
        return {
            ...wallet_,
            isConnected : action.payload.isConnected,
            address : action.payload.address,
            chainId : action.payload.chainId,
        }
        case "GET_BALANCE" :
        return {
            ...wallet_,
            balance : action.payload.balance,
        }
        case "SET_ISSUE" :
        return {
            ...wallet_,
            issue : action.payload,
        }
        default : 
            return wallet;
    }
}


export default combineReducers({
    wallet : walletInfo,
})