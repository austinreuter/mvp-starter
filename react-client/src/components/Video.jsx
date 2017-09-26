import React from 'react';

const Video = (props) => (
  <div>
    <span>
      { props.video.description }
    </span>
    <span>
      { props.video.likes }
    </span>

  </div>
)

export default Video;