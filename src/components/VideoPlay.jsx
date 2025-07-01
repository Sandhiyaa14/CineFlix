import React from 'react'
import { IoMdClose } from "react-icons/io";
import useFetchDetail from '../hook/useFetchDetail';

const VideoPlay = ({close,id,explore}) => {
    const {data : video} = useFetchDetail(`${explore}/${id}/videos`)
    const trailer = video?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    
  return (
    <section onClick={close} className='fixed bg-neutral-900 top-0 left-0 z-40 right-0 bottom-0 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-black w-full h-[50vh] md:h-[80vh] max-w-screen-lg aspect-video rounded relative'>
        <button onClick={close} className='absolute -right-1 text-3xl -top-6 z-50'>
            <IoMdClose />
        </button>
          {trailer ? (
                    <iframe 
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        className='w-full h-full'
                        allow="autoplay"
                    ></iframe>
                    
                ) : (
                    <div className="flex items-center justify-center h-full text-white">
                        <p>No trailer available</p>
                    </div>
                )}
      </div>
    </section>
  )
}

export default VideoPlay
