import './index.css'
import { FaChevronRight } from "react-icons/fa";
import {useState, useEffect } from 'react';
import React from 'react'
import { SkewLoader } from 'react-spinners';

import { Link } from 'react-router';

const NowPlaying = () => {
const [nowplayingMoviesList, setNowplayingMoviesList] = useState([]);
   const  [nowplayingmoviesloader, setnowplayingmoviesloader] =useState(true);

const renderNowplayingMovies = () => {
  if (nowplayingmoviesloader) {
    return (
      <div className="dot-loader-container">
        <SkewLoader loading={true} size={30} duration={1} color="#FFFFFF" />
      </div>
    );
  }

  return (
    <>
      {nowplayingMoviesList.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="nowplaying-movie-link">
          <div className="nowplaying-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="nowplaying-poster"
            />
            <div className="nowplaying-info">
              <h2 className="nowplaying-title">{movie.title}</h2>
              <p className="nowplaying-rating">⭐ {movie.rating}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

 useEffect(()=>{

        const fetchNowPlayingMovies = async () => {
          setnowplayingmoviesloader(true)
            const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=4910708f3cdd44608a521cfd40be3cbd');
            const data = await response.json();
            console.log(data);
            if(response.ok){
                const formattedData = data.results.map((each) => {
                    return {
                        id: each.id,
                        title: each.title,
                        poster_path: each.poster_path,
                        rating: each.vote_average,
                        popularity: each.popularity

                    }
                })
                setnowplayingmoviesloader(false)
                setNowplayingMoviesList(formattedData);
            }
        }
        fetchNowPlayingMovies();
    },[])



return (
<>
<h1 className='nowplaying-heading'>Now Playing<span className='right-nowplaying-icon'><FaChevronRight /></span></h1>
<div className="nowplaying-movies-container">
    {renderNowplayingMovies()}


</div>
</>


)
    

}






export default NowPlaying;