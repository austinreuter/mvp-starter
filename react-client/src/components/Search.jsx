import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      name: ''
    };
  }
  queryUp(e) {
  	e.preventDefault();
    this.setState({query: e.target.value});
  }
  nameUp(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  render() {
  	return (
      <div> 
        <form>
          
          <input type="text" onKeyUp={(e)=> this.nameUp(e)} placeholder="playlist name"/>
        </form>
        <form>
          <input type="text" onKeyUp={(e)=> this.queryUp(e)} placeholder="add-to/search playlist >"/>
          <button type="submit" onClick={(e) => this.props.search(e, this.state.query, this.state.name)} />
        </form>

      </div>
  	)
  }

}

export default Search;