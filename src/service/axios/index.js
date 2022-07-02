import axios from 'axios'

export const getTopList = async () => {
    var blob
    await axios.get('http://localhost:5050/topList',{responseType : "blob"}).then((response => {
        blob = response.data
    }))
    return blob
}
