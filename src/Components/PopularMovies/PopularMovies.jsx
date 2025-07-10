import './index.css';
import { useState, useEffect } from 'react';
import { FaCaretRight } from "react-icons/fa";
import { Link } from 'react-router';
import { SkewLoader } from 'react-spinners';
import React from 'react';

const PopularMovies = () => {
  const [movieslist, setMovieslist] = useState([]);
  const [popularMoviesLoader, setPopularMoviesLoader] = useState(true); // Loader state

  const RenderMovieCards = ({ moviesList }) => {
    if (popularMoviesLoader) {
      return (
        <div className="dot-loader-container">
          <SkewLoader loading={true} size={30} duration={1} color="#FFFFFF" />
        </div>
      );
    }

    return (
      <>
        {moviesList.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="result-movie-link">
            <div className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-rating">⭐ {movie.rating}</p>
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setPopularMoviesLoader(true);
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=4910708f3cdd44608a521cfd40be3cbd'
      );
      const data = await response.json();
      if (response.ok) {
        const formatteddata = data.results.map((each) => {
          return {
            id: each.id,
            title: each.title,
            poster_path: each.poster_path,
            overview: each.overview,
            rating: each.vote_average,
          };
        });
        setMovieslist(formatteddata);
        setPopularMoviesLoader(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <>
      <h1 className="popular-movies-heading">
        Popular Movies <span className='right-icon'><FaCaretRight /></span>
      </h1>
      <div className="popular-movies-list">
        {RenderMovieCards({ moviesList: movieslist })}
      </div>
    </>
  );
};

export default PopularMovies;
