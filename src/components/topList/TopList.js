import React , { useEffect, useState } from 'react';
import { getTopList } from '../../service/axios';
import { imgReader } from '../../utils/imgReader';
const TopList = () => {
    const [imgUrl, setImgUrl] = useState()
    useEffect(() => {
        getTopList().then((blob) => {
            imgReader(blob).then((url) => {
                setImgUrl(url)
            })
        })
    },[])
    

    return <div>TopList <img src={imgUrl} alt=""/></div>
}

export default TopList;