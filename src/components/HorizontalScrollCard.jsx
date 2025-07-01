import React, { useRef } from 'react'
import moment from 'moment/moment'
import { useSelector } from 'react-redux'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const HorizontalScrollCard = ({data,title,trending,showGrid,type}) => {
    const {bannerImg} = useSelector(state=>state.movieData)
    const scrollRef = useRef();
    const handleLeft =() => {
      scrollRef.current.scrollBy({left:-500,behavior:"smooth"})
    }
    const handleRight =() => {
      scrollRef.current.scrollBy({left:500,behavior:"smooth"})
    }

  return (
      <div className='w-full container mx-auto my-10 p-2 relative'>
        <div className='relative'>
             <h1 className='font-semibold text-2xl ml-4 pt-1'>{title}</h1>
             <div className='absolute left-0 top-0 bg-primary w-2 rounded-xl h-10'></div>
        </div>
        <div  ref={scrollRef}  className={showGrid ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-8":'flex  gap-5 mt-8  overflow-x-auto scroll-snap-x hide-scroll '}>
            {data.map((data,index)=>(
                <Link to={`/${data.media_type || type}/${data.id}`} className={showGrid ? "min-w-[150px] sm:min-w-[150px] md:min-w-[180px] w-full ":"w-36 sm:w-40 md:w-48  flex flex-col  shrink-0 relative cursor-pointer"} key={data.id}>
                    <div className='w-full relative overflow-hidden'>
                       <img 
                            src={bannerImg + data.backdrop_path} 
                            className='w-full aspect-[2/3] md:h-72 rounded-xl object-cover object-center transition-all duration-200 ease-in-out transform hover:scale-105'
                      style={{ willChange: 'transform' }}/>
                        {trending && <div className='absolute left-2 top-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md z-10'>
                          <h1>#{index+1} Trending</h1>
                        </div>}
                    </div>
                    <div className='w-full p-2'>
                        <h1 className='text-primary text-md font-semibold text-ellipsis line-clamp-1'>{data.title || data.name}</h1>
                        <div className='block md:flex items-center justify-between'>
                            <p className='text-sm my-1 text-neutral-400 '>{moment(data.release_date).format("MMMM Do YYYY")}</p>
                            <p className='text-xs text-white'>Rating: {data.vote_average !== undefined ? data.vote_average.toFixed(1) : "N/A"}</p>
                        </div>
                    </div>

                </Link>
            ))}
        </div>
        {!showGrid && <div className='absolute top-0 hidden md:flex items-center justify-between w-full h-full p-2 pointer-events-none'>
          <FaChevronLeft className='bg-white text-black fill-current rounded-full p-2 w-8 h-8 cursor-pointer pointer-events-auto' onClick={handleLeft}/>
          <FaChevronRight className='bg-white text-black fill-current rounded-full p-2 w-8 h-8 cursor-pointer pointer-events-auto' onClick={handleRight}/>
        </div>}
      </div>
  )
}

export default HorizontalScrollCard
