import axios from "axios"
import { useEffect, useState } from "react"

const useFetchDetail = (url) => {
    const [data,setData] = useState([]);
    const api_key= process.env.REACT_APP_API_KEY;
    useEffect(()=>{
        const fetchData = async() => {
            const response = await axios.get(`${url}?api_key=${api_key}`)
            setData(response.data)
        }
        fetchData();
    },[url])
    return{data}
}


export default useFetchDetail;