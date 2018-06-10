import React from 'react';
import MovieList from './MovieList.js';

class MovieContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }
  
  mergeSort(arr) {
      if (arr.length < 2)
          return arr;

      var middle = parseInt(arr.length / 2);
      var left   = arr.slice(0, middle);
      var right  = arr.slice(middle, arr.length);

      return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  merge(left, right) {
      var result = [];

      while (left.length && right.length) {
          if (left[0].vote_average <= right[0].vote_average) {
              result.push(left.shift());
          } else {
              result.push(right.shift());
          }
      }

      while (left.length)
          result.push(left.shift());

      while (right.length)
          result.push(right.shift());

      return result;
  } 
  
  componentDidMount() {
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=9557abc26b54d9e0d581d82fa22bcb7e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2&with_genres=80")
    .then(res => res.json())
    .then(results => {
      const movies = this.mergeSort(results.results).reverse();
      this.setState({movies: movies});
      return movies;
    }).then(movies => {        
        var listMovies = [];
        // just using 8.5 IMDb rating as a test
        var ratingVal = 8.5;
        var movies = this.state.movies.map(movie => {
            var apiStr = "https://www.omdbapi.com/?apikey=2b5c3b4a&t=" + movie.title;
            // fetch api call to other movie service that provides IMDb and RT ratings
            fetch(apiStr)
            .then(res => res.json())
            .then(results => {
                if(results.Ratings && results.Ratings[0]) {                    
                    if(results.Ratings[0].Value.slice(0,3) > ratingVal)
                        listMovies.push(movie);
                }
            })
        });
        // Want to set movies property to list of movies retrieved 
        // with rating > or < ratingVal var
        // this.setState({movies: listMovies});    
    });
  }
  
  render() {        
    return (
      <MovieList movies={this.state.movies} />
    );
  }
}

export default MovieContainer;