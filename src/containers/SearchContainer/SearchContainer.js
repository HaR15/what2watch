import React from 'react';
import Filter from '../../components/Filter/Filter.js';
import SearchContainerStyle from './SearchContainer.css';

class SearchContainer extends React.Component {	

	constructor() {
		super();
		this.state = {
			filterStrings: ['Genre', 'Year'],
			filters: [],
			genres: [],
			movies: []
		}
	}

	constructYearFilter() {
		var years = [];
		var d = new Date();	
		for(var i = d.getFullYear(); i >= 2006; i--) {
			years.push(i);
		}
		return {name: "Year", values: years, onClickHandler: this.props.onClickHandlers.yearOnClick};
	}


	componentDidMount() {
		var genreFilter = this.constructGenreFilter();
		var yearFilter = this.constructYearFilter();
		var IMDbRatingFilter = this.constructIMDbFilter();
		var RTRatingFilter = this.constructRTFilter();
		genreFilter.then(genres => {	
			this.setState({filters: [yearFilter, {name:"Genre", values: genres, onClickHandler: this.props.onClickHandlers.genreOnClick}, IMDbRatingFilter, RTRatingFilter ]});
		});		
	}

	constructGenreFilter() {
		var genres = [];
		return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=9557abc26b54d9e0d581d82fa22bcb7e&language=en-US")
		.then(res => res.json())
		.then(results => {
			results.genres.map(genre => {
				genres.push(genre.name)
			});	
			return genres;		
		});
	}
	
	constructIMDbFilter() {
		var ratings = [];
		for(var i = 10; i >= 1; i -= 1) {
			ratings.push(i + "+");
		}
		return {name: "IMDb Rating", values: ratings, onClickHandler: this.props.onClickHandlers.imdbOnClick};
	}

	constructRTFilter() {
		var ratings = [];
		for(var i = 100; i >= 1; i -= 10) {
			ratings.push(i + "+");
		}
		return {name: "Rotten Tomatoes (%)", values: ratings, onClickHandler: this.props.onClickHandlers.rottenOnClick};
	}

	makeSuggestion(str) {
		var searchBox = document.querySelector('#searchBox');
		
		fetch("https://api.themoviedb.org/3/discover/movie?api_key=9557abc26b54d9e0d581d82fa22bcb7e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres=12")
		.then(res => res.json())
		.then(results => {
			this.setState( {movies: results.results} );
		});
	}

	buttonStyle = {
		width: '100%',
		display: 'inline-block'
	}

	searchBtnStyle = {
		marginTop : '27px',
		width: '400px'
	}

	labelStyle = {
		color: 'white'
	}

	render() {
		return (
			<div className="searchContainer">
				<div className="row">
					{this.state.filters.map(filter => 
						<Filter filter={filter} />
					)}
					<div className="input-group-btn col-sm-2">
					</div>					
				</div>
			</div>
		);
	}
}

export default SearchContainer;