import React from "react";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import BannerHome from "../components/BannerHome";
import useFetch from "../hook/useFetch";

const Home = () => {
  const { bannerData } = useSelector((state) => state.movieData);
  const { data: nowPlaying } = useFetch("/movie/now_playing");
  const { data: topRated } = useFetch("/movie/top_rated");
  const { data: popular } = useFetch("/tv/popular");
  const { data: onTheAir } = useFetch("/tv/on_the_air");
  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={bannerData} title="Trending" trending={true} />
      <HorizontalScrollCard data={nowPlaying} title="Now Playing" type="movie" />
      <HorizontalScrollCard data={topRated} title="Top Rated" type="movie" />
      <HorizontalScrollCard data={popular} title="Popular Tv Show" type="tv" />
      <HorizontalScrollCard data={onTheAir} title="On The Air" type="tv" />
    </div>
  );
};

export default Home;
