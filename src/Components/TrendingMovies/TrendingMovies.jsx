import './index.css';
import {useState, useEffect } from 'react';
import { FaChevronRight } from "react-icons/fa";
import React from 'react'
import { SkewLoader } from 'react-spinners';
import {Link} from 'react-router';


const TrendingMovies = () => {
    const [TrendingMovieslist, setTrendingMovieslist] = useState([]);
    const  [trendingmoviesloader, settrendingmoviesloader] =useState(true);

    const RenderTrendingMovieCards = () => {
  if (trendingmoviesloader) {
    return (
      <div className="dot-loader-container">
               <SkewLoader loading={true} size={30} duration={1} color="#FFFFFF" />
       
      </div>
    );  
  }

  return (
    <>
      {TrendingMovieslist.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="trending-movie-link">
          <div className="trending-movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="trending-movie-poster"
            />
            <div className="trending-movie-info">
              <h2 className="trending-movie-title">{movie.title}</h2>
              <p className="trending-movie-rating">⭐ {movie.rating}</p>
              <p className="trending-movie-popularity">Popularity: {movie.popularity}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};






useEffect(() => {
    const fetchTrendingMovies = async () => {
        settrendingmoviesloader(true)
       const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=4910708f3cdd44608a521cfd40be3cbd');
        const data = await response.json();
       if(response.ok) {
      const formatteddata =data.results.map((each) => {
            return {
                id: each.id,
                title: each.title,
                poster_path: each.poster_path,
                popularity: each.popularity,
                rating: each.vote_average,
            };
        });
     setTrendingMovieslist(formatteddata);
     settrendingmoviesloader(false)
       }
     
    };
    fetchTrendingMovies();
  }, []);

return (
    <>
        <h1 className='trending-movies-title'>Trending Movies<span className='trending-movies-icon'><FaChevronRight />
</span></h1>
        <div className="trending-movies-container">

{RenderTrendingMovieCards()}

        </div>
    </>
);









}
export default TrendingMovies;