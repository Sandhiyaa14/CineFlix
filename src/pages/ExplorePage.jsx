import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import HorizontalScroll from "../components/HorizontalScrollCard"
const ExplorePage = () => { 
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const api_key= process.env.REACT_APP_API_KEY;

  const fetchData = async() => {
    try {
      const response = await axios.get(`/discover/${params.explore}?page=${pageNo}&api_key=${api_key}`)
      setData(prev => ([...prev, ...response.data.results]))
    }
    catch(err) {
      console.log(err)
    } 
  }

  useEffect(() => {
    // Reset state 
    setData([])
    setPageNo(1)
  }, [params.explore])

  useEffect(() => {
    fetchData()
  }, [params.explore, pageNo])

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 ) {
        setPageNo(prev => prev + 1)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className='text-white '>
      <HorizontalScroll data={data} title={`Popular ${params.explore === 'movie' ? 'Movies' : 'TV Shows'}`} showGrid={true} type={params.explore}/>
    </div>
  )
}

export default ExplorePage
