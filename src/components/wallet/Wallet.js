import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {connectWallet, getBalance } from '../../actions'


const Wallet = props => {
    useEffect(() => {
        // console.log('useEffect')
        getBalance_(props,props.wallet.address)
    },[props.wallet.isConnected])
    const wallet = props.wallet
    console.log('isConnected : ',window.ethereum.isConnected())
    return <div>{ wallet.isConnected 
        ? <div><p>account : {wallet.address}</p><p>balance : {wallet.balance} </p><p>network : {wallet.chainId}</p></div>
        : <button onClick={() => clickConnect(props)}>Connect Wallet</button> }
    </div>
}

const clickConnect = (props)  => {
    console.log('click')
    getAccount(props)
}

const getAccount = (props) => {
    if(typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((data) => {
            const address = data[0]
            window.ethereum.request({ method : 'eth_chainId'}).then((data) => {
                const chainId = data
                props.connectWallet({
                    isConnected : true,
                    address : address,
                    chainId : chainId,
                })
            })
        })
        
    }   
}

const getBalance_ = async (props,address) => {
    console.log('getBalance')
    while(props.wallet.isConnected) {
        window.ethereum.request({ method : 'eth_getBalance',params:[address]}).then((data) => {
            console.log(data)
            // props.getBalance({
            //     balance : data,
            // })
        }).catch(error => console.log(error))
        
        await sleep(3000)
    }
}

const sleep = (ms) => {
    return new Promise((r) => setTimeout(r,ms));
}

const mapStateToProps = state => {
    return {wallet : state.wallet}
}

export default connect(mapStateToProps, {connectWallet,})(Wallet)