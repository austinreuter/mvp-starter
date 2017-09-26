import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }
  keyUp(e) {
  	e.preventDefault();
    this.setState({query: e.target.value});
  }

  render() {

  	return (
      <div> 
        <form>
          <input type="text" onKeyUp={(e)=> this.keyUp(e)}/>
          <button type="submit" onClick={(e) => this.props.search(e, this.state.query)}/> 
        </form>
      </div>
  	)
  }

}

export default Search;