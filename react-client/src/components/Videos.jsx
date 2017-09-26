import React from 'react';
import Video from './Video.jsx';

const Videos = (props) => (
  <div>
    <h4> Videos </h4>
    There are { props.videos.length } videos. 
    <br/> Click the title to add to a new playlist
    <ul>
      { props.videos.map((video, key) => <Video updatePlaylist={props.updatePlaylist} primeVideo={props.primeVideo} video={video} key={key}/>)}
    </ul>
  </div>
)

export default Videos;