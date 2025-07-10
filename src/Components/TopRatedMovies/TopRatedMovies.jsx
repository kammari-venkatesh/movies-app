import './index.css';
import { FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import React from 'react';
import { SkewLoader } from 'react-spinners';

const TopRatedMovies = () => {
  const [topRatedMovieslist, setTopRatedMovieslist] = useState([]);
  const [topRatedLoader, setTopRatedLoader] = useState(true); // loader state

  const renderTopRatedMovieCards = () => {
    if (topRatedLoader) {
      return (
        <div className="dot-loader-container">
          <SkewLoader loading={true} size={30} duration={1} color="#FFFFFF" />
        </div>
      );
    }

    return (
      <>
        {topRatedMovieslist.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="toprated-movie-link">
            <div className="toprated-movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="toprated-movie-poster"
              />
              <div className="toprated-movie-info">
                <h2 className="toprated-movie-title">{movie.title}</h2>
                <p className="toprated-movie-rating">⭐ {movie.rating}</p>
                <p className="toprated-movie-votes">Votes: {movie.votes}</p>
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setTopRatedLoader(true);
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=4910708f3cdd44608a521cfd40be3cbd');
      const data = await response.json();

      if (response.ok) {
        const formattedData = data.results.map((each) => ({
          id: each.id,
          title: each.title,
          poster_path: each.poster_path,
          rating: each.vote_average,
          votes: each.vote_count,
        }));
        setTopRatedMovieslist(formattedData);
        setTopRatedLoader(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <>
      <h1 className='top-rated-movies-title'>
        Top Rated Movies <span className='right-toprated-icon'><FaChevronRight /></span>
      </h1>
      <div className='top-rated-movies-container'>
        {renderTopRatedMovieCards()}
      </div>
    </>
  );
};

export default TopRatedMovies;
