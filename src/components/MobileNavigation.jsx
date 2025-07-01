import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";

const MobileNavigation = () => {
  return (
    <div className='p-2 lg:hidden h-14  bg-background py-3 text-gray-400 fixed bottom-0 z-50 w-full flex justify-between items-center'>
      <NavLink className={({isActive})=>`flex justify-center items-center flex-col text-xl ${isActive && "text-white" }`} to={"/"}><IoMdHome />Home</NavLink>
      <NavLink className={({isActive})=>`flex justify-center items-center flex-col text-xl ${isActive && "text-white" }`} to={"/tv"}><PiTelevisionFill /> Tv Shows</NavLink>
      <NavLink className={({isActive})=>`flex justify-center items-center flex-col text-xl ${isActive && "text-white" }`}to={"/movie"}><BiSolidMoviePlay /> Movies</NavLink>  
      <NavLink className={({isActive})=>`flex justify-center items-center flex-col text-xl ${isActive && "text-white" }`} to={"/search"}><IoIosSearch /> Search </NavLink>                      
    </div>
  )
}

export default MobileNavigation
