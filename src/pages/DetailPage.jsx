import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hook/useFetch";
import useFetchDetail from "../hook/useFetchDetail";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import Divider from "../components/Divider";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import { FaPlay } from "react-icons/fa";
import VideoPlay from "../components/VideoPlay";

const DetailPage = () => {
  const { id, explore } = useParams();

  const { data: detail } = useFetchDetail(`${explore}/${id}`);
  const { data: cast } = useFetchDetail(`${explore}/${id}/credits`);
  const { data: similar } = useFetch(`${explore}/${id}/similar`);
  const {data : recommend} = useFetch(`${explore}/${id}/recommendations`)

  const { bannerImg } = useSelector((state) => state.movieData);

  const[playVideo,setPlayVideo] = useState(false);

  const runtime = detail.runtime || detail.episode_run_time?.[0] || 0;
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  const crew = cast?.crew || [];
  const director = crew
    .filter((c) => c.job?.toLowerCase() === "director")
    .map((dir) => dir.name);

  return (
    <div className="w-full">
      <div className="w-full h-[300px] ">
        <div className="w-full h-full relative">
          <img
            className="w-full h-full object-cover"
            src={bannerImg + detail.backdrop_path}
            alt=""
          />
          <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
        </div>
      </div>
      <div className="container mx-auto px-8 flex gap-6 md:flex-row flex-col">
        <div className="md:-mt-28 -mt-20 w-full md:w-fit  md:block flex  justify-center relative">
          <div>
            <img
            className="md:w-72 w-52 md:h-96 h-60 rounded object-cover"
            src={bannerImg + detail.poster_path}
            alt=""
          />
          <button onClick={()=>setPlayVideo(true)} className="bg-white text-black font-semibold text-lg w-full p-1 rounded mt-2 flex items-center justify-center "><FaPlay className="mr-1 text-primary"/> Play Now</button>
          </div>
        </div>
        <div className="md:mt-10 w-full">
          <h1 className="text-2xl md:text-3xl font-bold md:text-start text-center mb-2">
            {detail.title || detail.name}
          </h1>
          <p className="text-neutal-400 my-5 text-center md:text-start">
            {detail.tagline}
          </p>
          <Divider />
          <div className="flex gap-4 text-sm md:text-md lg:text-lg text-gray-400 md:justify-normal justify-center items-center w-full py-2 ">
            <p className="text-center">
              Rating : <br className="md:hidden"></br>
              {Number(detail.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p className="text-center">
              View : <br className="md:hidden"></br>
              {Number(detail.vote_count)}
            </p>
            <span>|</span>
            <p className="text-center">
              Duration : <br className="md:hidden"></br>
              {hours}h {minutes}m
            </p>
          </div>
          <Divider />
          <div className="my-5">
            <h3 className="text-2xl font-semibold text-center md:text-start mt-4 md:mt-0">
              Overview
            </h3>
            <p className="text-center md:text-start text-gray-400 ">
              {detail.overview}
            </p>
          </div>
          <Divider />
          <div className="flex gap-4 text-sm md:text-md lg:text-lg text-gray-400 md:justify-normal justify-center items-center w-full py-2 ">
            <p className="text-center">
              Status : <br className="md:hidden"></br>
              {detail.status}
            </p>
            <span>|</span>
            <p className="text-center">
              Release Date : <br className="md:hidden"></br>
              {moment(detail.release_date).format("MMMM Do YYYY")}
            </p>
            <span>|</span>
            <p className="text-center">
              Revenue : <br className="md:hidden"></br>
              {Number(detail.revenue)}
            </p>
          </div>
          <Divider />
          <div>
            <p className="text-center my-4 text-neutral-400 md:text-start">
              Director : {director}
            </p>
          </div>
          <Divider />
          <div className="mt-4 px-2">
            <h3 className="text-lg text-center md:text-start font-bold">
              Cast :{" "}
            </h3>
            <div className="flex flex-wrap items-center gap-5 md:justify-normal justify-center">
              {(cast.cast || [])
                .filter((el) => el.profile_path)
                .map((starCast, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col w-[90px] "
                  >
                    <img
                      src={bannerImg + starCast.profile_path}
                      alt={starCast.name}
                      className="w-24 h-24 object-cover rounded-full"
                    />
                    <p className="text-center text-sm">{starCast.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <HorizontalScrollCard
          data={similar}
          title={explore == "tv" ? "Similar Tv Shows" : "Similar Movies"}
          type={explore}
        />
      </div>
        <div className="px-2">
        <HorizontalScrollCard
          data={recommend}
          title={explore == "tv" ? "Recommendation Tv Shows" : "Recommendation Movies"}
          type={explore}
        />
      </div>

      {playVideo && <VideoPlay close={()=>setPlayVideo(false)} explore={explore} id={id}/>}
    </div>
  );
};

export default DetailPage;
