
import './index.css'
function BackgroundVideo() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
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
        <button className='overlay-button'>
          Explore Shows
        </button>
      </div>
     
    </div>
  );
}

export default BackgroundVideo;
