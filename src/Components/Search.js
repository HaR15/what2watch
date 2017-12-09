import React from 'react';

class Search extends React.Component {
	render() {
		return (
			<div className="">
				<div className="col-sm-6">
					<input type="text" placeholder="Search random movies by: ">
					</input>
				</div>
				<div className="col-sm-3">
					<select>
				    	<option value="imdbRating">IMDb Rating</option>
			        	<option value="RTRating">Rotten Tomatoes Rating</option>
			        	<option value="year">Year</option>
					</select>
				</div>
				<div className="col-sm-3">
					<button>Search
					</button>
				</div>
			</div>
		);
	}
}

export default Search;