import React, { useEffect, useState } from 'react'
import { FaPlay } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
    const [search,setSearch] = useState("")
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        setSearch("")
        e.preventDefault();
        if(search!==""){
           navigate(`/search?q=${search}`)
        }
   }
   return (
    <div className='w-full bg-background opacity-80 '>
        <div className='flex items-center justify-between container mx-auto px-2 py-3 gap-4'>
            <div className='flex items-center cursor-pointer'>
                <FaPlay className="text-2xl text-primary mr-2" />
                <Link to={"/"} className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-[#7B4DFF] to-[#C04CFD] bg-clip-text text-transparent">
        CineFlix
                </Link>
                <div className='hidden lg:flex self-end gap-4 ml-6 text-highlight font-semibold cursor-pointer'>
                    <NavLink to={"/tv"} className="text-xl">Tv Shows</NavLink>
                    <NavLink to={"/movie"} className="text-xl">Movies</NavLink>
                </div>
         </div>

        <form className='w-40 sm:w-60 md:w-72 lg:w-80 flex items-center justify-between border-2 lg:border-4 p-1 px-2 rounded-lg border-button  focus:border-white' onSubmit={handleSubmit} >
            <input type="search" className='w-full outline-none bg-transparent' placeholder='search...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        {search == "" && (<FaSearch className=' text-white text-sm right-0 top-3 mr-2'/>)}
        </form>
     </div>
 </div>
  )
}

export default Header
