import axios from "axios";
import React, { useState, useEffect } from "react";

const FileButton = () => {
    const [chooseImg, setChoose] = useState()

    useEffect(() => {
        console.log('chooseImg : ', chooseImg)
        if(typeof chooseImg !== 'undefined') {
            console.log('choose!' , chooseImg)
            const form = new FormData()
            form.append('img',chooseImg)
            axios.post('http://localhost:5050/uploadFile',form,{headers:{"Content-Type" : 'multipart/form-data',}}).then((response) => {
                console.log(response)
            }).catch((e) => {
                console.log(e)
            })
        }
    })

    return <input type='file' name='img' accept="image/*" onChange={(event)=>setChoose(event.target.files[0])}/> 
}

export default FileButton