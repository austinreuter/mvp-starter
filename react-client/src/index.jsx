import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Videos from './components/Videos.jsx';
import Search from './components/Search.jsx';
import Default from './components/Default.jsx';
import Option1 from './components/Option1.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      name: '',
      playlists: '',
      playlistUpdate: ''
    }
  }
  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/playlists', 
      success: (playlists) => {
        this.showPlaylists(playlists)
        var newPlaylist = [];
        playlists.forEach(playlist => newPlaylist.push(playlist.playlist));

        this.setState({playlists: playlists}, (e) => {
          console.log('in setstate playlists', playlists, 'newPlaylist',newPlaylist)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
  showPlaylists(e) {
    return this.state.playlists; 
  }

  renderPlaylist(e) {
    console.log(e.target.value)
    var playlistToRetrieve = e.target.value;
    $.ajax({
      url: '/grab',
      type: 'POST',
      data: {
        query: JSON.stringify(playlistToRetrieve)
      },
      success: (videos) => {
        console.log(videos)
        /*this.setState({
          videos: videos
        });*/
      },
      error: (err) => {
        console.log('err', err);
      }

    })
  }

  updatePlaylist(video) {

    $.ajax({
      type: 'POST',
      url: '/playlists',
      data: {
        video: JSON.stringify(video),

        playlist: JSON.stringify(this.state.playlists)
      },
      success: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log('err on update', err);
      }
    }); 
  }

  search(e, query, name) {
    e.preventDefault();
    console.log(query, name);
    console.log('state playlist', this.state.playlists)
    $.ajax({
      url: '/search',
      type: 'POST',
      data: {
        query: JSON.stringify(query),
        name: JSON.stringify(name)
      },
      success: (videos) => {
        this.setState({
          videos: videos
        });
      },
      error: (err) => {
        console.log('err', err);
      }

    })
  }
  nameUp(e) {
    this.setState({playlists:e.target.value})
  }
  primeVideo(video) {
    //grab updated video
    //add to this.state.videoToAdd
    //update video to add with name;
    this.addPlaylist(video);
    //call add video to playlist
  }  
  addPlaylist(video) {
    $.ajax({
      url: '/videos',
      type: 'POST',
      data: {
        video: JSON.stringify(video),
        playlist: JSON.stringify(this.state.playlists)
      },
      success: (videos) => {
        console.log('saved playlist')
      } ,
      error: (err) => {
        console.log('err', err);
      }
    })
  }

  render () {
    return (
      <div>
        <h1>
        YOUTUBE2 playlist
        </h1>
        <Search search={this.search.bind(this)}/>
        <br/>
         <form>
          <input type="text" onKeyUp={(e)=> this.nameUp(e)} placeholder="Add to this playlist..."/>
        </form>
        <Option1 renderPlaylist={this.renderPlaylist.bind(this)} playlists={this.showPlaylists.bind(this)}/>
        <Videos videos={this.state.videos} updatePlaylist={this.updatePlaylist.bind(this)} primeVideo={this.primeVideo.bind(this)}/>
      </div>
    )
  }
}





ReactDOM.render(<App />, document.getElementById('app'));