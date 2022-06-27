export const connectWallet = wallet => {
    return {
        type : 'CONNECT_WALLET',
        payload : wallet,
    }
}

export const getBalance = wallet => {
    return {
        type : 'GET_BALANCE',
        payload : wallet,
    }    
}