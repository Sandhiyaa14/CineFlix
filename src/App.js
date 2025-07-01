import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ExplorePage from './pages/ExplorePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import Footer from './components/Footer';
import Header from './components/Header';
import MobileNavigation from './components/MobileNavigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setBannerImg, setNowPlaying, setTopRated } from './slice/slice';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const api_key =process.env.REACT_APP_API_KEY;

  const dispatch = useDispatch()
  const fetchTrending = async() => {
    try{
      const response = await axios.get(`/trending/all/week?api_key=${api_key}`);
      dispatch(setBannerData(response.data.results))
    }
    catch(err){
      console.log(err);
    }
  }

  const fetchImg = async() =>{
    try{
     const response = await axios.get(`/configuration?api_key=${api_key}`);
     dispatch(setBannerImg(response.data.images.secure_base_url + "original"))
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchTrending();
    fetchImg();
  },[])

  
  
  return (
    <BrowserRouter>
    <ScrollToTop />
     <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path=":explore" element={<ExplorePage />}/>
      <Route path=":explore/:id" element={<DetailPage />}/>
      <Route path="search" element={<SearchPage />}/>
    </Routes>
          <Footer />
          <MobileNavigation />
    </BrowserRouter>
  );
}

export default App;
