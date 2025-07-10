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
        <source src="/videocontainer/background-video1.mp4" type="video/mp4" />
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
        <source src="/videocontainer/background-video.mp4" type="video/mp4" />
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
