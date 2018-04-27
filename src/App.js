// API Key: b3b7cc78
// http://www.omdbapi.com/
//
// 		Scenario:
// 		Create a React App displays a search box and a button. Upon clicking the button it will send the data from the search box to http://www.omdbapi.com/.
//    Use the results to update your react application state and render the title and description in a row below the search box and input button.
//    Make subsequent searches add additional rows to your react application.
// 		Please use a full redux implementation with this application to store your search results state rather than utilizing in component state for everything.

import React, { Component } from 'react';
import { bindActionCreators }  from "redux";
import './App.css';
import { connect } from 'react-redux'
import { addSearch } from './actions/search'

const mapStateToProps = (state) => ({
	search: state
});

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		addSearch: addSearch
	}, dispatch);
}

class App extends Component {
  onSearch(e) {
	  e.preventDefault();
	  const text = this.refs.text.value;
    this.getMovieData.call(this,text);
  }

  getMovieData(search) {
	  fetch("http://www.omdbapi.com/?apikey=b3b7cc78&t="+search)
			  .then(res => res.json())
			  .then(
					  (result) => {
					  	if(result.Error) {
							  alert(result.Error);
						  } else {
							  this.props.store.dispatch(addSearch(result));
						  }
					  },
					  (error) => {
					  	console.log(error)
					  }
			  )
  }
  createSearches(arr) {
  	if(Array.isArray(arr)) {
  		return arr.map(function(v){
  			return (
					  <tr>
						  <td>{v.title}</td>
						  <td>{v.description}</td>
					  </tr>
			  )
		  })
	  }
  }
  render() {
    return (
      <div className="App">
	      <div className="formSection">
		      <form onSubmit={this.onSearch.bind(this)} ref='form'>
			      <input type='text' ref='text' placeholder="Enter your search"/><br/>
			      <input type='submit' value='Search Movie' />
		      </form>
	      </div>
	      <div className="tableSection">
		      {this.props.search.length > 0 && <table>
			      <thead>
				      <tr>
					      <th>Title</th>
					      <th>Description</th>
				      </tr>
			      </thead>
			      <tbody>
			      {this.props.search && this.createSearches.call(this, this.props.search)}
			      </tbody>
		      </table>}
	      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
