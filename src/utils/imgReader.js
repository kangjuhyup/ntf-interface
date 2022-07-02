import reducers from "../reducers";

export const imgReader = async (blob) => {
    var url
    const reader = new FileReader();
    reader.readAsDataURL(blob)
    return new Promise((resolve,reject) => {
        reader.onloadend = async () => {
            resolve(reader.result)
        }
    })
}
