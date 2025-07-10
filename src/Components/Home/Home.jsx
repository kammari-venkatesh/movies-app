import './index.css'
import Homeheader from '../Homeheader/Homeheader';
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo';
import PopularMovies from '../PopularMovies/PopularMovies';
import TrendingMovies from '../TrendingMovies/TrendingMovies';
import React from 'react'

import PopularTvshows from '../PopularTvshows/PopularTvshows';
import TopRatedMovies from '../TopRatedMovies/TopRatedMovies';
import NowPlaying from '../NowPlaying/NowPlaying';
import UpcomingMovies from '../UpcomingMovies/UpcomingMovies';
import EntryFooter from '../EntryFooter/EntryFooter';
const footerdata = {
  queries: "Any Queries? : Call 0612-0625-1114",
  links: ["About Us", "Careers", "Privacy Policy", "Terms of Service"]
};

const Home= () => {
  return (
   <div className='home-container'>
   <div> <Homeheader /></div>
   <div ><BackgroundVideo /></div>
    <div className='home-content'>
    <div><PopularMovies /></div>
    <div><TrendingMovies /></div>
    <div><PopularTvshows /></div>
    <div><TopRatedMovies /></div>
    <div><NowPlaying /></div>
    <div><UpcomingMovies /></div>

</div>
        <hr className='divider'/>

  <div ><EntryFooter details={footerdata} /></div>
   </div>
  );
};

export default Home;

