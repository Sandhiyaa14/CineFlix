import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import HorizontalSctoll from "../components/HorizontalScrollCard"
import { FaSearch } from 'react-icons/fa';
const SearchPage = () => {
  const [data,setData] = useState([]);
  const [search] = useSearchParams();
  const [pageNo,setPageNo] = useState(1);
  const query = search.get("q")
  const [loading, setLoading] = useState(false)

  const api_key = process.env.REACT_APP_API_KEY;


  const [searchInput,setSearch] = useState("")
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        setSearch("")
        e.preventDefault();
        if(search!==""){
           navigate(`/search?q=${searchInput}`)
        }
   }

  const fetchData = async() => {
    
    try{
      setLoading(true)
      const response = await axios.get(`/search/multi?query=${encodeURIComponent(query)}&page=${pageNo}&api_key=${api_key}`);
      setData(prev => [...prev, ...response.data.results])
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false)
    }
  }
    useEffect(()=>{
      
    const handleScroll = () => {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100){
      setPageNo(prev => prev + 1)
    }
  }
    window.addEventListener("scroll",handleScroll)
    return () => (window.removeEventListener("scroll",handleScroll))
  },[])
  

  useEffect(() => {
  setData([]) // Clear previous results
  setPageNo(1) // Reset to first page
  fetchData()
}, [query])
  
  return (
    <div>
      {loading ? <div className='flex justify-center w-full items-center h-screen'>
        <p className="text-xl text-primary animate-pulse">Loading...</p>
      </div> : !query ?  <form className='w-full h-screen flex items-center justify-center ' onSubmit={handleSubmit} >
                  <input type="search" className='w-52 outline-none bg-transparent border-2 lg:border-4 p-1 px-2 rounded-lg border-white  focus:border-white' placeholder='search movie/tv...' value={searchInput} onChange={(e)=>setSearch(e.target.value)}/>
              </form>: data.length === 0 ? (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl text-neutral-400">No results found!</h1>
      </div>
    ) : 

          <HorizontalSctoll
            data={data}
            showGrid={true}
            title="Search Results"
          />
    }
    </div>
  )
}


export default SearchPage
