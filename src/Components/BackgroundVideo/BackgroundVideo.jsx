import React from 'react'
import { Link } from 'react-router';
import './index.css'
function BackgroundVideo() {
  return (
    <div>
      <div className='mobile-view-video'>
        <video
          autoPlay
          muted
          loop
        playsInline
       className="background-video"
      >
<source src="https://res.cloudinary.com/dwatnpdcy/video/upload/v1752660955/8K_Hdr_The_Mirror_Dimension_Spider-Man_No_Way_Home_Dolby_5.1-00.02.21.192-00.03.02.430_ksqv0q.mp4" type="video/mp4" />  
      Your browser does not support the video tag.
      </video>
      </div>
        <div className='medium-view-video'>
        <video
          autoPlay
          muted
          loop
        playsInline
       className="background-video"
      >
        <source src="https://res.cloudinary.com/dwatnpdcy/video/upload/v1752660955/8K_Hdr_The_Mirror_Dimension_Spider-Man_No_Way_Home_Dolby_5.1-00.02.21.192-00.03.02.430_ksqv0q.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
      <div className="overlay-content">
        <h1 className='overlay-title'>
          Your World of Entertainment
        </h1>
        <p className='overlay-description'>
          Dive into a universe of stories, adventures, and emotions with StreamSphere.
        </p>
        <Link to='/search' className='linkedbtn'><button className='overlay-button'>
          Explore Shows
        </button></Link>
      </div>
     
    </div>
  );
}

export default BackgroundVideo;
