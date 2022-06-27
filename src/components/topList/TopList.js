import React , { useEffect, useState } from 'react';
import axios from 'axios'


const TopList = () => {
    const [imgUrl, setImgUrl] = useState()
    axios.get('http://localhost:5050/topList',{responseType : "blob"}).then((response => {
        const imageBlob = response.data
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob)
        reader.onloadend = () => {
            const base64data = reader.result
            console.log(base64data)
            setImgUrl(base64data)
        }
    }))

    return <div>TopList <img src={imgUrl} alt=""/></div>
}

export default TopList;