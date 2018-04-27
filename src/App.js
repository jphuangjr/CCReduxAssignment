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
import PropTypes from 'prop-types';

// ---- Mapping of state to props and dispatch to props  ----- //
const mapStateToProps = (state) => ({
	search: state
});

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		addSearch: addSearch
	}, dispatch);
}
// ---- END Mapping of state to props and dispatch to props  ----- //

class App extends Component {
	static propTypes = {
		/**
		 * A redux prop that is an array of movie data.
		 * Movie data is an object with the format {title: "title", description: "description", key:"key"}
		 */
		search: PropTypes.array,

		/**
		 * The redux store that is passed in so we can access the dispatch functionality.
		 */
		store: PropTypes.object
	};
	// ---- On search method that is called when the form is submitted. Calls the getMovieData method  ----- //
  onSearch(e) {
	  e.preventDefault();
	  const text = this.refs.text.value;
    this.getMovieData.call(this,text);
  }

	// ---- Ajax call to get movie data. Dispatched a redux action  ----- //
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

	// ---- Maps data in redux search prop to create the title and descriptions of the movies searched  ----- //
  createSearches(arr) {
  	if(Array.isArray(arr)) {
  		return arr.map(function(v){
  			return (
					  <tr key={v.key}>
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
