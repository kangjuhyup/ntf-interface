import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {connectWallet, getBalance, setIssue } from '../../actions'
import { sleep } from '../../utils/timer'

import { getBlockNum, issueNTF } from '../../service/web3';


const Wallet = props => {
    useEffect(() => {
        if(props.wallet.isConnected) {
            getBalance_(props)
        }
    },[props.wallet.isConnected])
    const wallet = props.wallet
    console.log('isConnected : ',window.ethereum.isConnected())
    return <div>{ wallet.isConnected 
        ? <div>
            <p>account : {wallet.address}</p>
            <p>balance : {wallet.balance}</p>
            <p>network : {wallet.chainId}</p>
            <button onClick={()=>clickIssue(props)}>NTF 발행하기</button>
        </div>
        : <button onClick={() => clickConnect(props)}>Connect Wallet</button> }
    </div>
}

const clickConnect = (props)  => {
    getAccount(props)
}

const clickIssue = (props) => {
    props.setIssue(true)
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

const getBalance_ = async (props) => {
    console.log('getBalance')
    // while(props.wallet.isConnected) {
    //     window.ethereum.request({ method : 'eth_getBalance',params:[props.wallet.address]}).then((data) => {
    //         props.getBalance({
    //             balance : data,
    //         })
    //     }).catch(error => console.log(error))
        
    //     await sleep(3000)
    // }
}


const mapStateToProps = state => {
    return {wallet : state.wallet}
}

export default connect(mapStateToProps, {connectWallet,getBalance,setIssue})(Wallet)