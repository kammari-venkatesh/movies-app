
import './index.css'
import React from 'react'
import Homeheader from '../Homeheader/Homeheader'
import { LuScanSearch } from "react-icons/lu";
import {useState, useEffect } from 'react';
import { Link } from 'react-router';
import { SkewLoader } from 'react-spinners';

const SearchMovies = () =>{
 const [Searhterm ,setSearchterm] =useState('')
 const [resultarray, setResultarray] = useState([])
 const [resultload, setresultload]=useState(true)
    console.log(resultarray)
    useEffect(()=>{
        const getserachdetails = async () =>{
           setresultload(true)
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4910708f3cdd44608a521cfd40be3cbd&query=${Searhterm}`);
            const data = await response.json();
            console.log(data)
         if(response.ok){
         
            const formattedData = data.results.map((each) => {
  return {
    id: each.id,
    title: each.title,
    overview: each.overview,
    poster: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
    releaseDate: each.release_date,
    rating: each.vote_average,
  };
});
 setResultarray(formattedData)  
  setresultload(false)
         }
         
        }
        getserachdetails();
    },[Searhterm])

const onChangesearchitm = (e) =>{
        setSearchterm(e.target.value.toLowerCase())
}
const renderResultdata = () => {
  if (resultload) {
    return (
      <div className="no-results-container">
        <SkewLoader loading={true} size={45} duration={1} color="#FFFFFF" />
      </div>
    );
  }

  return <>
  <div className='search-result-container'>{
  
  resultarray.map((each) => (
    
    <Link to={`/movie/${each.id}`} key={each.id} className="movie-link">
      <div className="result-card">                 
        <img src={each.poster} className="result-img" alt={each.title} />
        <h2 className="result-movie-title">{each.title}</h2>
        <p className="result-release-date">Release Date: {each.releaseDate}</p>
        <p className="result-rating">⭐{each.rating}/10</p>
      </div>
    </Link>
  ))
  }
  </div></>
};





    return(
        <div className='search-container'>
            <Homeheader/>
            <div className='total-container'>
            <div className='searchbar-container'>
                <input type='search' placeholder='Search Movies and Shows Here' className='search-bar' onChange={onChangesearchitm}/>
                <LuScanSearch className='search-icon' />

            </div>
        </div>
        <div className='result-content'>
        {  resultarray.length===0 ?  (
      <div className="no-results-container">
        <img
          src="https://res.cloudinary.com/dwatnpdcy/image/upload/v1752150297/noresults_image_ptbjkn.png"
          alt="No results"
          className="no-results-image"
        />
      </div>
    ):(
        <div >
        {renderResultdata()}
        </div>
        )}
        </div></div>
    )
}
export default SearchMovies