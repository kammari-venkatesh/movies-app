import './index.css'
import { useEffect ,useState} from 'react';
import { FaAngleDown } from "react-icons/fa6";
import React from 'react'



const UpcomingMovies = () => {
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);

  const renderUpcomingMovies = () => {
    return (

        <>

 <div className="timeline-list">
        {upcomingMoviesList.map((movie, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-dot">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="timeline-content">
              <h3 className='gone-title'>{movie.title}</h3>
              <p className='movie-overview'>{movie.overview}</p>
              <p className='release'>Release Date: {movie.releasedate}</p>
              <p className='movie-rating'>Rating: ⭐/{movie.rating}</p>
            </div>
          </div>
        ))}
      </div>



</>
    )
  }
useEffect(() => {
 const fetchUpcomingMovies = async () => {
  const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=4910708f3cdd44608a521cfd40be3cbd');
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    const formattedData = data.results.map((each) => {
      return {
        id: each.id,
        title: each.title,
        poster_path: each.poster_path,
        rating: each.vote_average,
        popularity: each.popularity,
        overview: each.overview,        
        releasedate: each.release_date,
      }
    });
    setUpcomingMoviesList(formattedData);
  }
 }

    fetchUpcomingMovies();


}, []);

return(

<>
<h1 className='upcoming-heading'>Upcoming Movies<span className='down-icon'><FaAngleDown /></span></h1>
<div className='mobile-upcoming-container'>
{renderUpcomingMovies()}



</div>
</>


)






}

export default UpcomingMovies;