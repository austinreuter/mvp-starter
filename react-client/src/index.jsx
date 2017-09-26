import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Videos from './components/Videos.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: []

    }
  }

  componentDidMount() {
    //grab stored user(s) videos;
    $.ajax({
      url: '/videos', 
      success: (videos) => {
        this.setState({
          videos: videos
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  search(e, query) {
    e.preventDefault();
    console.log(query);
    $.ajax({
      url: '/search',
      type: 'POST',
      data: {query: JSON.stringify(query)},
      success: (videos) => {
        this.setState({
          videos: videos
        })
      } ,
      error: (err) => {
        console.log('err', err);
      }

    })
  }

  render () {
    return (
      <div>
        <h1>Vid finder</h1>
        <Search search={this.search.bind(this)}/>
        <Videos videos={this.state.videos}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));