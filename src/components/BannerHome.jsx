import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';

const BannerHome = () => { 
    const {bannerData} = useSelector(state=>state.movieData)
    const {bannerImg} = useSelector(state=>state.movieData)

  return (
    <div className='w-full h-full'>
     <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      loop={true}
      slidesPerView={1}
      className="w-full h-full"
    >
        {bannerData.map((data,index)=>(
          <SwiperSlide key={index}>
            <Link to={`${data.media_type}/${data.id}`} className='relative'>
               <div className="w-full h-[62vh] md:h-[80vh] relative">
                  <img src={bannerImg + data.backdrop_path} alt="" className='w-full h-full object-cover' />
               </div>
               <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
               <div className='absolute bottom-4 w-full px-2'>
                <div className='container mx-auto'>
                    <h2 className='text-2xl lg:text-4xl'>{data.title || data.name}</h2>
                    <p style={{ wordSpacing: '0.3rem' }} className='text-ellipsis line-clamp-3 max-w-md  my-2 text-neutral-300'>{data.overview}</p>
                    <div className='flex items-center gap-4'>
                        <p>Rating: {Number(data.vote_average).toFixed(1)} +</p>
                        <span>|</span>
                        <p>View : {Number(data.popularity).toFixed(0)}</p>
                    </div>
                    <div>
                        <button className='bg-white px-4 py-2 font-bold rounded mt-4 text-black bg-gradient-to-r from-[#7B4DFF] to-[#C04CFD]'>Play Now</button>
                    </div>
                </div>
                </div>
            </Link>
            </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BannerHome
