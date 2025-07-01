import axios from "axios"
import { useState , useEffect } from "react"

const useFetch = (url) => {
    const[data,setData] = useState([])
    const api_key= process.env.REACT_APP_API_KEY;
    useEffect(()=>{
        const fetch = async() => {
        try{
            const response =await axios.get(`${url}?api_key=${api_key}`)
            setData(response.data.results)
        }
        catch(err){
            console.log(err);
        }
    }
    fetch()
    },[url])
    return {data}
}

export default useFetch;