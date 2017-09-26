import React from 'react';
import Video from './Video.jsx';

const Videos = (props) => (
  <div>
    <h4> Videos </h4>
    There are { props.videos.length } videos.
    { props.videos.map((video, key) => <Video video={video} key={key}/>)}
  </div>
)

export default Videos;