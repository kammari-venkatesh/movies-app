import './index.css';
import Homeheader from '../Homeheader/Homeheader';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import React from 'react';
import ReactPlayer from 'react-player';
import EntryFooter from '../EntryFooter/EntryFooter';
import { FaExternalLinkAlt } from "react-icons/fa";
import { SkewLoader } from 'react-spinners';

const footerdata = {
  queries: "Any Queries? : Call 0612-0625-1114",
  links: ["About Us", "Careers", "Privacy Policy", "Terms of Service"]
};

const Moviedetails = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [moviescontent, setMoviescontent] = useState(null);
  const [castandcrew, setCastandcrew] = useState(null);
  const [loadingCastCrew, setLoadingCastCrew] = useState(true);
  const [loadingMovieContent, setLoadingMovieContent] = useState(true);

  useEffect(() => {
 const fetchMovieDetails = async () => {
  const videoresponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4910708f3cdd44608a521cfd40be3cbd`
  );
  const data = await videoresponse.json();
  console.log("video mawa", data);

  if (videoresponse.ok) {
    if (data.results.length > 0) {
      const formattedData = data.results.map((each) => ({
        id: each.id,
        key: each.key,
        name: each.name,
        site: each.site,
        type: each.type,
      }));
      setVideoData(formattedData);
    } else {
      // ✅ fallback when results array is empty
      setVideoData([
        {
          id: "default",
          key: "2OEL4P1Rz04", // YouTube video key
          name: "Default Trailer",
          site: "YouTube",
          type: "Trailer",
        },
      ]);
    }
  } else {
    // ✅ fallback when fetch failed
    setVideoData([
      {
        id: "default",
        key: "2OEL4P1Rz04",
        name: "Default Trailer",
        site: "YouTube",
        type: "Trailer",
      },
    ]);
  }
};

    const moviecontent = async () => {
      setLoadingMovieContent(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4910708f3cdd44608a521cfd40be3cbd`
      );
      const data = await response.json();
      if (response.ok) {
        const movie = data;
        const formattedData = {
          adult: movie.adult,
          backdrop_path: movie.backdrop_path,
          budget: movie.budget,
          genreNames: movie.genres.map((genre) => genre.name),
          original_language: movie.original_language,
          original_title: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          revenue: movie.revenue,
          runtime: movie.runtime,
          status: movie.status,
          bookingpage: movie.homepage,
          tagline: movie.tagline,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
          production_companies: movie.production_companies.map((company) => ({
            logo_path: company.logo_path,
            name: company.name,
            origin_country: company.origin_country,
          })),
          production_countries: movie.production_countries.map(
            (country) => country.name
          ),
        };

        setMoviescontent(formattedData);
        setLoadingMovieContent(false);
      }
    };

    const getCastndCrew = async () => {
      setLoadingCastCrew(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4910708f3cdd44608a521cfd40be3cbd`
      );
      const data = await response.json();
      if (response.ok) {
        const formattedData = {
          cast: data.cast.map((each) => ({
            id: each.id,
            name: each.name,
            original_name: each.original_name,
            character: each.character,
            profile_path: each.profile_path,
            known_for_department: each.known_for_department,
            popularity: each.popularity,
            gender: each.gender,
          })),
          crew: data.crew.map((each) => ({
            id: each.id,
            name: each.name,
            original_name: each.original_name,
            department: each.department,
            job: each.job,
            profile_path: each.profile_path,
            known_for_department: each.known_for_department,
            popularity: each.popularity,
            gender: each.gender,
          })),
        };
        setCastandcrew(formattedData);
        setLoadingCastCrew(false);
      }
    };

    moviecontent();
    fetchMovieDetails();
    getCastndCrew();
  }, [id]);

  const renderCast = () => {
    if (loadingCastCrew) {
      return (
        <div className="dot-loader-container">
          <SkewLoader loading={true} size={30} color="#FFFFFF" />
        </div>
      );
    }

    return (
      <div className='casting'>
        {castandcrew?.cast.map((each) => (
          <div className='cast-card' key={each.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${each.profile_path}`}
              className='cats-profile'
              alt={each.name}
            />
            <p className='cast-name'>{each.name}</p>
            <p className='cast-char'>Character {each.character}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderCrew = () => {
    if (loadingCastCrew) {
      return (
        <div className="dot-loader-container">
          <SkewLoader loading={true} size={30} color="#FFFFFF" />
        </div>
      );
    }

    return (
      <div className='crew-container'>
        {castandcrew?.crew.map((each) => (
          <div className='crew-card' key={each.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${each.profile_path}`}
              className='cats-profile'
              alt={each.name}
            />
            <p className='cast-name'>{each.name}</p>
            <p className='cast-char'>Department {each.department}</p>
            <p className='crew-job'>Job {each.job}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderProductionCompanies = () => {
    if (loadingMovieContent) {
      return (
        <div className="dot-loader-container">
          <SkewLoader loading={true} size={30} color="#FFFFFF" />
        </div>
      );
    }

    return (
      <div className='production-companies'>
        {moviescontent?.production_companies.map((each, id) => {
          const imageUrl =
            each.logo_path === null
              ? 'https://image.tmdb.org/t/p/w500/2ycs64eqV5rqKYHyQK0GVoKGvfX.png'
              : `https://image.tmdb.org/t/p/w500${each.logo_path}`;

          return (
            <div className="company-card" key={id}>
              <img
                src={imageUrl}
                alt={each.name}
                className='productioncompany-image'
              />
              <p className='productcampany-name'>{each.name}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="final-moviedetails">
      <Homeheader />
      <div className='final-movie-video-container'>
        {videoData && videoData[0] && (
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${videoData[0].key}`}
            playing
            className="final-moviedetails-video"
            width="100%"
            height="auto"
          />
        )}
      </div>
      <div className='final-details'>
        <h1 className='final-movie-title'>{moviescontent?.original_title}</h1>
        <p className='final-tag-line'>{moviescontent?.tagline}</p>
        <div className='final-genre-container'>
          {moviescontent?.genreNames.map((each) => (
            <p className='final-genre-formovie'>{each}</p>
          ))}
        </div>
        <p className='final-movie-overview'>{moviescontent?.overview}</p>
        <p className='final-releasedata'>ReleaseDate :{moviescontent?.release_date}</p>
        <p className='final-runtime'>Runtime :{moviescontent?.runtime}min</p>
        <div className='final-ratings-for-movie'>
          <span className='thing'>{moviescontent?.adult ? '18+' : '16+'}</span>
          <span className='thing'>⭐ {moviescontent?.vote_average}/10</span>
          <span className='thing'>Popularity: {moviescontent?.popularity}</span>
        </div>

        <h1 className='cast-heading'>Cast</h1>
        {renderCast()}

        <h1 className='crew-heading'>Crew</h1>
        {renderCrew()}

        <h1 className='producton-heading'>Production House</h1>
        {renderProductionCompanies()}

        <div className='last-container'>
          <h1 className='last-qoute'>Filmed for <br /> IMAX </h1>
          <a href={moviescontent?.bookingpage} className='final-link'>Visit <span className='final-linkicon'><FaExternalLinkAlt /></span></a>
        </div>
      </div>
      <hr className='line-break' />
      <EntryFooter details={footerdata} />
    </div>
  );
};

export default Moviedetails;
