import Web3 from "web3";
import { sleep } from "../../utils/timer";
import contract from '../../config/contract.json'
export const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/d9873ccc564a410f8db12c97cd3b92ac'))

export const getBlockNum = () => {
    web3.eth.getBlockNumber().then((data) => console.log(data))
}

export const issueNTF = async (address,tokenURI) => {
    const myContract = new web3.eth.Contract(contract.abi,contract.ca)
    const data = myContract.methods.awardItem(address,tokenURI).encodeABI()
    const tx = {
        to : contract.ca,
        from : window.ethereum.selectedAddress,
        value : '0x00',
        data : data,
    }
    const hash =  await sendTx(tx)
    return hash
}

export const sendTx = async (tx) =>  {
    var txHash_
    await window.ethereum.request({
        method : 'eth_sendTransaction',
        params : [tx]
    }).then((txHash) => {
        txHash_ = txHash
    })
    return txHash_
} 

export const monitorTx = async (txHash) => {
    var receipt_
    var pending = false
    while(!pending) {
        await sleep(5000)
        console.log('start monitor : ', txHash)
        web3.eth.getTransactionReceipt(txHash).then((receipt) => {
            console.log(receipt)
            if(receipt.status) {
                console.log(txHash,' is Confirm!!!')
                pending = true
                receipt_ = receipt
            } else {
                console.log(txHash,' is Pending...')
            }
        }).catch( e => console.log(e))
    }
    return receipt_
}