import React from 'react';
import ReactDom from 'react-dom';

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
          
          <input type="text" onKeyUp={(e)=> this.nameUp(e)} placeholder="new playlist name"/>
        </form>
        <br/>
        <form>
          <input type="text" onKeyUp={(e)=> this.queryUp(e)} placeholder="search youtube >"/>
          <button type="submit" onClick={(e) => this.props.search(e, this.state.query, this.state.name)} />
        </form>

      </div>
  	)
  }

}

export default Search;