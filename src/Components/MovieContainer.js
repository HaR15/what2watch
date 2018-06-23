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
    .then(results => results.results)
    .then(movies => {        
        var moviesList = [];
        var promises = [];
        // just using this hardcoded IMDb rating as a test
        var ratingVal = 7.0;

        movies.map(function(movie) {
            var apiStr = "https://www.omdbapi.com/?apikey=2b5c3b4a&t=" + movie.title;
            promises.push(                
                // fetch api call to other movie service that provides IMDb and RT ratings
                fetch(apiStr)
                .then(res => res.json())
                .then(results => {                    
                    if(results.Ratings) {        
                        movie.year = results.Year;
                        movie.imdb = results.Ratings[0] ? results.Ratings[0].Value : "N/A";
                        movie.rottenTomatoes = results.Ratings[1] ? results.Ratings[1].Value : "N/A";
                        movie.imdbID = results.imdbID ? results.imdbID : "N/A";
                        if(results.Ratings[0]) {                    
                            if(results.Ratings[0].Value.slice(0,3) > ratingVal) {
                                moviesList.push(movie);
                            }
                        }
                    }                      
                })
            );
        });
        Promise.all(promises).then(() => {
            this.setState({movies: moviesList});
        });
 
    });
  }
  
  render() {        
    return (
      <MovieList movies={this.state.movies} />
    );
  }
}

export default MovieContainer;