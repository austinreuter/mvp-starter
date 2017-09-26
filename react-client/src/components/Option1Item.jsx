import React from 'react';
import ReactDom from 'react-dom';
import Option1 from './Option1Item.jsx'

class Option1Item extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		videos: ''
  	}
  }

  render() {
	  return (
    <div>
  
      <br/>
      <li>
        <button onClick={(e) => this.props.renderPlaylist(e)}> 
          {this.props.playlist.playlist}
        </button>
        <button>
        {this.props.number}
        </button>
      </li>
      <button>
      <iframe className="youtube-player" type="text/html" width="166" height="100"
        src={'http://www.youtube.com/embed/'+JSON.parse(this.props.playlist.videos[0]).id} frameBorder="0">
      </iframe>
      </button>
        <ul> 
          <button> songs </button>
            {this.props.playlist.videos.map(video => 
            	<ul>
            	  <li> <button>title</button> {JSON.parse(video).title} 
            	    <br/>
            	    <button>description</button> {JSON.parse(video).description}
            	  </li>
            	</ul>
            )}
        </ul>
  
    </div>
    )
  }
}

export default Option1Item;