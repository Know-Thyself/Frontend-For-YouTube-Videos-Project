import React, { useState } from 'react';
import exampleresponse from './exampleresponse.json';
import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddVideoForm from './AddVideoForm';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone';
import ThumbDownAltTwoToneIcon from '@material-ui/icons/ThumbDownAltTwoTone';

const MiniYouTube = () => {
  const [searchInput, setSearchInput] = useState([]);
  const [videos, setVideos] = useState(exampleresponse);

  const handleSearchInput = (e) => {
    console.log(e.target.value);
    setSearchInput(e.target.value.toLowerCase());
    const searchResult = videos.filter((video) =>
      video.title.toLowerCase().includes(searchInput)
    );
    setVideos(searchResult);
    if (e.target.value === '') setVideos(exampleresponse);
  };

  const videoRemover = (e) => {
    const toBeRemoved = e.target.parentElement.id;
    const remainingVideos = videos.filter(
      (video) => video.id.toString() !== toBeRemoved
    );
    return setVideos(remainingVideos);
  };

  const addNewVideo = (title, url) => {
    const regExp =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regExp);
    if (title === '') {
      alert('Title should not be empty!');
    } else if (url === '') {
      alert('You have not entered a url!');
    } else if (!match) {
      alert('Invalid url!');
    } else
      setVideos([...videos, { id: '', title: title, url: url, rating: 0 }]);
  };

  const incrementRating = (e) => {
    const id = e.target.parentElement.id;
    const likedVideo = videos.find((video) => video.id.toString() === id);
    likedVideo.rating = likedVideo.rating + 1;
    const i = videos.findIndex((video) => video.id === likedVideo.id);
    let newArray = [...videos];
    newArray[i] = likedVideo;
    setVideos(newArray);
  };

  const decrementRating = (e) => {
    const id = e.target.parentElement.id;
    const dislikedVideo = videos.find((video) => video.id.toString() === id);
    dislikedVideo.rating = dislikedVideo.rating - 1;
    const i = videos.findIndex((video) => video.id === dislikedVideo.id);
    let newArray = [...videos];
    newArray[i] = dislikedVideo;
    setVideos(newArray);
  };
  const ascendingOrder = videos.sort(
    (a, b) => parseFloat(a.rating) - parseFloat(b.rating)
  );
  const descendingOrder = videos.sort(
    (a, b) => parseFloat(b.rating) - parseFloat(a.rating)
  );
  return (
    <div key='main-wrapper'>
      <div key='buttonAndSearch' className='add-button-and-search-wrapper'>
        <header className='App-header'>
          <div>
            <Button
              className='ascending'
              onClick={ascendingOrder}
              variant='contained'
              color='default'
            >
              Ascending
            </Button>
          </div>
          <div>
            <h1>Video Recommendation</h1>
          </div>
          <div>
            <Button
              className='descending'
              onClick={descendingOrder}
              variant='contained'
              color='default'
            >
              Descending
            </Button>
          </div>
        </header>
        <AddVideoForm addNewVideo={addNewVideo} />
        <div key='input-form' className='search-input-wrapper'>
          <i key='fasIcon' className='fas fa-search'></i>
          <input
            key='search-input'
            type='text'
            className='search-bar'
            placeholder='Search for a video ...'
            value={searchInput}
            onChange={handleSearchInput}
          />
        </div>
      </div>
      <div className='main-container'>
        {videos.map((video) => {
          const video_id = video.url.split('v=')[1];
          return (
            <div className='video-and-details-wrapper'>
              <div title-div>
                <h4 className='video-title'>{video.title}</h4>
              </div>
              <div className='video-container'>
                <iframe
                  width='458'
                  height='315'
                  src={'https://www.youtube.com/embed/' + video_id}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
              <h5>Votes: {video.rating}</h5>
              <div className='buttons-container'>
                <ThumbDownAltTwoToneIcon
                  id={video.id}
                  onClick={decrementRating}
                  className='dislike'
                  fontSize='large'
                  variant='contained'
                  style={{ color: 'antiquewhite' }}
                />
                <Button
                  id={video.id}
                  onClick={videoRemover}
                  variant='contained'
                  color='secondary'
                  className='delete-button'
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
                <ThumbUpAltTwoToneIcon
                  id={video.id}
                  onClick={incrementRating}
                  className='like'
                  fontSize='large'
                  variant='contained'
                  style={{ color: 'antiquewhite' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniYouTube;
