import React from 'react';
import Video from './Video.jsx';

const Videos = (props) => (
  <div>

    <br/>
    <h2> Videos </h2>

    There are { props.videos.length } videos. 
     Click the title to add to a new playlist
    <br/>
    <ul>
      { props.videos.map((video, key) => <Video updatePlaylist={props.updatePlaylist} primeVideo={props.primeVideo} video={video} key={key}/>)}
    </ul>
  </div>
)

export default Videos;