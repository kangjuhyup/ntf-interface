import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { setIssue } from "../../actions";
import { issueNTF, monitorTx } from "../../service/web3"

const IssuePage = props => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [ntfName, setNtfName] = useState()
    const [ntfDescription, setNtfDescription] = useState()
    const [ntfMinPrice, setNtfMinPrice] = useState()
    const [chooseImg, setChoose] = useState()
    const [imgPath, setImgPath] = useState()

    useEffect(() => {
        console.log(typeof chooseImg)
        if(typeof chooseImg !== 'undefined') {
            const form = new FormData()
            form.append('img',chooseImg)
            axios.post('http://localhost:5050/uploadFile',form,{headers:{"Content-Type" : 'multipart/form-data',}})
            .then((response) => {
                setImgPath(response.data)
            }).catch((e) => {
                console.log(e)
            })
        }
    },[chooseImg])

    const clickIssue = () => {
        const tokenURI = new Object()
        tokenURI.name = ntfName
        tokenURI.description = ntfDescription
        tokenURI.image = imgPath
        issueNTF(props.wallet.address,JSON.stringify(tokenURI)).then((txHash) => {
            monitorTx(txHash).then((receipt) => {
                console.log('Issue receipt : ' ,receipt)
            })
        })
    }

    const clickBack = () => {
        props.setIssue(false)
    }

    return <div>
            <button onClick={() => clickBack()}>뒤로가기</button>
            <input type='file' name='img' accept="image/*" onChange={(event)=>setChoose(event.target.files[0])}/> 
            <input type="text" name="ntf-name" onBlur={(e) => setNtfName(e.target.value)} />
            <input type="text" name="ntf-description" onBlur = {(e) => setNtfDescription(e.target.value)} />
            <input type="number" step=".000001" name="ntf-minPrice" onBlur = {(e) => setNtfMinPrice(e.target.value)} />
            <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
            <ReactDatePicker selected={endDate} onChange={(date) => setEndDate(date)}/>
            <button onClick={() => clickIssue()}>발행하기</button>
        </div>
    
}







const mapStateToProps = state => {
    return {wallet : state.wallet}
}

export default connect(mapStateToProps, {setIssue,})(IssuePage)

