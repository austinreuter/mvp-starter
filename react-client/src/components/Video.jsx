import React from 'react';
import ReactDOM from 'react-dom';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      description: '',
      video: this.props.video,
    }
  }
  descriptionUp(e) {
    e.preventDefault();
    this.setState({description: e.target.value});

    var videoToSave = this.state.video;
    videoToSave.description = this.state.description;
    this.state.video = videoToSave;
  }
  addDescription(e) {
  	e.preventDefault();
    this.props.primeVideo(this.state.video);
  }

  render() {
  return (
    <div>

      <div> 
        <button onClick={(e) => this.props.updatePlaylist(this.state.video, e)} >
        UPDATE Playlist
        </button>
      </div>
      <li>
        <span onClick={() => this.props.primeVideo(this.state.video)} >
          {this.props.video.title}
        </span>
        <form>
          <input type="text" onKeyUp={(e) => this.descriptionUp(e)} placeholder="remember a description"/>
          <button type="submit" onClick={(e) => this.addDescription(e)} 
          />
        </form>
        <ul>
          <li>
            { this.props.video.description }
          </li>
        </ul>
      </li>
      <span>
        { this.props.video.likes }
      </span>
  
    </div>
    )
  }
}

export default Video;