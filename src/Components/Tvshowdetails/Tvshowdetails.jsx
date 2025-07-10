import './index.css';
import Homeheader from '../Homeheader/Homeheader';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import React from 'react';
import ReactPlayer from 'react-player';
import EntryFooter from '../EntryFooter/EntryFooter';
import { FaExternalLinkAlt } from "react-icons/fa";

const footerdata = {
  queries: "Any Queries? : Call 0612-0625-1114",
  links: ["About Us", "Careers", "Privacy Policy", "Terms of Service"]
};

const Tvshowdetails = () => {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [tvContent, setTvContent] = useState(null);
  const [castAndCrew, setCastAndCrew] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=4910708f3cdd44608a521cfd40be3cbd&language=en-US`);
      const data = await response.json();
      if (response.ok) {
        const formatted = data.results.map(each => ({
          id: each.id,
          key: each.key,
          name: each.name,
          site: each.site,
          type: each.type,
        }));
        setVideoData(formatted);
      }
    };

    const fetchTvDetails = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=4910708f3cdd44608a521cfd40be3cbd&language=en-US`);
      const data = await response.json();
      if (response.ok) {
        const formatted = {
          adult: data.adult,
          backdrop_path: data.backdrop_path,
          genreNames: data.genres.map(g => g.name),
          original_language: data.original_language,
          original_title: data.original_name,
          overview: data.overview,
          popularity: data.popularity,
          poster_path: data.poster_path,
          release_date: data.first_air_date,
          runtime: data.episode_run_time.length > 0 ? data.episode_run_time[0] : "N/A",
          status: data.status,
          bookingpage: data.homepage,
          tagline: data.tagline,
          vote_average: data.vote_average,
          vote_count: data.vote_count,
          production_companies: data.production_companies.map(company => ({
            logo_path: company.logo_path,
            name: company.name,
            origin_country: company.origin_country,
          })),
          production_countries: data.production_countries.map(c => c.name),
        };
        setTvContent(formatted);
      }
    };

    const fetchCastAndCrew = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=4910708f3cdd44608a521cfd40be3cbd&language=en-US`);
      const data = await response.json();
      if (response.ok) {
        const formatted = {
          cast: data.cast.map(each => ({
            id: each.id,
            name: each.name,
            original_name: each.original_name,
            character: each.character,
            profile_path: each.profile_path,
            known_for_department: each.known_for_department,
            popularity: each.popularity,
            gender: each.gender,
          })),
          crew: data.crew.map(each => ({
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
        setCastAndCrew(formatted);
      }
    };

    fetchTvDetails();
    fetchVideos();
    fetchCastAndCrew();
  }, [id]);

  const renderCast = () => (
    <div className='casting'>
      {castAndCrew?.cast.map((each) => (
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

  const renderCrew = () => (
    <div className='crew-container'>
      {castAndCrew?.crew.map((each) => (
        <div className='crew-card' key={each.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${each.profile_path}`}
            className='cats-profile'
            alt={each.name}
          />
          <p className='cast-name'>{each.name}</p>
          <p className='cast-char'>Department: {each.department}</p>
          <p className='crew-job'>Job: {each.job}</p>
        </div>
      ))}
    </div>
  );

  const renderProductionCompanies = () => (
    <div className='tvproduction-companies'>
      {tvContent?.production_companies.map((each, id) => {
        const imageUrl = each.logo_path
          ? `https://image.tmdb.org/t/p/w500${each.logo_path}`
          : 'https://image.tmdb.org/t/p/w500/2ycs64eqV5rqKYHyQK0GVoKGvfX.png';

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

  return (
    <div className="final-moviedetails">
      <Homeheader />

     <div className='final-movie-video-container'>
  {videoData && videoData.length > 0 ? (
    <ReactPlayer
      src={`https://www.youtube.com/watch?v=${videoData[0].key}`}
      playing
      className="final-moviedetails-video"
      width="100%"
      height="auto"
    />
  ) : (
    <p className="no-video-text">No trailer available for this show.</p>
  )}
</div>


      <div className='final-details'>
        <h1 className='final-movie-title'>{tvContent?.original_title}</h1>
        <p className='final-tag-line'>{tvContent?.tagline}</p>

        <div className='final-genre-container'>
          {tvContent?.genreNames.map((each, idx) => (
            <p className='final-genre-formovie' key={idx}>{each}</p>
          ))}
        </div>

        <p className='final-movie-overview'>{tvContent?.overview}</p>
        <p className='final-releasedata'>First Air Date: {tvContent?.release_date}</p>
        <p className='final-runtime'>Episode Runtime: {tvContent?.runtime} min</p>

        <div className='final-ratings-for-movie'>
          <span className='thing'>{tvContent?.adult ? '18+' : '16+'}</span>
          <span className='thing'>⭐ {tvContent?.vote_average}/10</span>
          <span className='thing'>Popularity: {tvContent?.popularity}</span>
        </div>

        <h1 className='cast-heading'>Cast</h1>
        {renderCast()}

        <h1 className='crew-heading'>Crew</h1>
        {renderCrew()}

        <h1 className='producton-heading'>Production Companies</h1>
        {renderProductionCompanies()}

        <div className='last-container'>
          <h1 className='last-qoute'>Filmed for <br /> IMAX</h1>
          <a href={tvContent?.bookingpage} className='final-link'>
            Visit <span className='final-linkicon'><FaExternalLinkAlt /></span>
          </a>
        </div>
      </div>

      <hr className='line-break' />
      <EntryFooter details={footerdata} />
    </div>
  );
};

export default Tvshowdetails;
