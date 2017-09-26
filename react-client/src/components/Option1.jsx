import React from 'react';
import ReactDom from 'react-dom';
import Option1Item from './Option1Item.jsx'

class Option1 extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      playlists: [],
      videos: []
    };
  }
  render() {

	return (
    <div>
      <br/>
      <div>
        <div onClick={() =>     
          this.setState({playlists: this.props.playlists()}, () => {
          		console.log(this.state.videos)	
          })
        }>
          <button>
          <button>click</button> for
          your
          <br/>
          <button>
          playlists
          </button>
          </button>
          <ul>
            {this.state.playlists.map((playlist, key) => <Option1Item  renderPlaylist={this.props.renderPlaylist} number={key} key={key} playlist={playlist} /> )}
          </ul>
        </div>
      </div>
    </div>
    )
  }
}

export default Option1;

