import './index.css';
import { FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import React from 'react';
import { SkewLoader } from 'react-spinners';

const PopularTvshows = () => {
  const [Tvshowslist, setTvshowslist] = useState([]);
  const [tvShowsLoader, setTvShowsLoader] = useState(true); // Loader state

  const RenderTvshowCards = () => {
    if (tvShowsLoader) {
      return (
        <div className="dot-loader-container">
          <SkewLoader loading={true} size={30} duration={1} color="#FFFFFF" />
        </div>
      );
    }

    return (
      <>
        {Tvshowslist.map((tvshow) => (
          <Link to={`/tvshow/${tvshow.id}`} key={tvshow.id} className="populartv-link">
            <div className="populartv-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                alt={tvshow.name}
                className="populartv-poster"
              />
              <div className="populartv-info">
                <h2 className="populartv-title">{tvshow.name}</h2>
                <p className="populartv-rating">⭐ {tvshow.rating}</p>
                <p className="populartv-country">Country: {tvshow.country}</p>
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchPopularTvShows = async () => {
      setTvShowsLoader(true);
      const response = await fetch(
        'https://api.themoviedb.org/3/tv/popular?api_key=4910708f3cdd44608a521cfd40be3cbd'
      );
      const data = await response.json();

      if (response.ok) {
        const formattedData = data.results.map((each) => {
          return {
            id: each.id,
            name: each.name,
            poster_path: each.poster_path,
            country: each.origin_country?.[0] || "N/A",
            rating: each.vote_average,
          };
        });
        setTvshowslist(formattedData);
        setTvShowsLoader(false);
      }
    };

    fetchPopularTvShows();
  }, []);

  return (
    <>
      <h1 className='popular-tvshows-heading'>
        Popular TV Shows<span className='right-icon-popular'><FaChevronRight /></span>
      </h1>
      <div className='popular-tvshows-list'>
        {RenderTvshowCards()}
      </div>
    </>
  );
};

export default PopularTvshows;
