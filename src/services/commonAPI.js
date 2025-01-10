//1 Import Axios
import axios from 'axios'


//2 configure the axios
export const commonAPI = async(httpmethod,url,reqBody,reqHeader)=>{
    const reqConfig = {
        method:httpmethod,
        url:url,
        data:reqBody,
        headers: reqHeader ? reqHeader :{
            "Content-Type":"application/json"
        }
    } 


return await axios(reqConfig).then((response)=>{
    return response
})
.catch((error)=>{
    return error
})

}