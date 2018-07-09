import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchContainer from '../SearchContainer/SearchContainer.js';
import MovieList from '../../components/MovieList/MovieList.js';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      genresMap: null,
      year: (new Date).getFullYear().toString(),
      genre: "80",
      imdb: "7",
      rottenTomatoes: "70",
      onClickHandlers: {
          yearOnClick: this.yearOnClick.bind(this),
          genreOnClick: this.genreOnClick.bind(this),
          imdbOnClick: this.imdbOnClick.bind(this),
          rottenOnClick: this.rottenOnClick.bind(this),
      }
    };
  }
    
  componentDidMount() {
    this.displayMovies(10, this.state.year);
    this.mapGenres(this.getGenresPromise());
  }   

  getGenresPromise() {
      return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=9557abc26b54d9e0d581d82fa22bcb7e&language=en-US")
      .then(res => res.json())
      .then(jsonData => jsonData.genres);
  }

  mapGenres(genresPromise) {
   genresPromise
   .then(genres => {
        var genresMap = {};
        genres.map(genre => {
            genresMap[genre.name] = genre.id;
        });
        return genresMap;
    }).then(genresMap => this.setState({genresMap: genresMap}));
  }

  displayMovies(numPages, year, genre, imdb, rottenTomatoes) {
    var numPages = numPages ? numPages : 1;
    var page = 1; 
    for(var page = 1; page <= numPages; page++) {
        var apiString = "https://api.themoviedb.org/3/discover/movie?api_key=9557abc26b54d9e0d581d82fa22bcb7e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + page;
        apiString += year ? "&primary_release_year=" + year : "";
        apiString += genre ? "&with_genres=" + genre : "";
        console.log(apiString);
        fetch(apiString)
        .then(res => res.json())
        .then(results => results.results)
        .then(movies => {
            var moviesList = [];
            var promises = [];
            // just using this hardcoded IMDb rating as a test
            var imdb = imdb ? imdb : this.state.imdb;
            var rottenTomatoes = rottenTomatoes ? rottenTomatoes : this.state.rottenTomatoes;
            var timeout = function(ms, promise) {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        reject(new Error("timeout"))
                    }, ms);
                    promise.then(resolve, reject)
                });
            };

            movies.map(function(movie) {
                var apiStr = "https://www.omdbapi.com/?apikey=2b5c3b4a&t=" + movie.title + "&r=jsonp";
                promises.push(                
                    // fetch api call to other movie service that provides IMDb and RT ratings
                    timeout(500, fetch(apiStr))
                    .then(res => res.json())
                    .then(results => {                    
                                console.log(moviesList);        
                        if(results.Ratings) {        
                            movie.year = results.Year;
                            movie.imdb = results.Ratings[0] ? results.Ratings[0].Value : "N/A";
                            movie.rottenTomatoes = results.Ratings[1] ? results.Ratings[1].Value : "N/A";
                            movie.imdbID = results.imdbID ? results.imdbID : "N/A";
                            if(results.Ratings[0] && results.Ratings[1]) {
                                if(results.Ratings[0].Value.slice(0,3) > imdb &&
                                results.Ratings[1].Value.slice(0,2) > rottenTomatoes) {
                                    moviesList.push(movie);
                                }
                            }
                        }                      
                    }).catch(function(error) {
                        // might be a timeout error
                        console.log('timeout error', error);
                    })
                );
            });
            Promise.all(promises).then(() => {
                console.log(moviesList);
                this.setState({movies: this.state.movies.concat(moviesList)});
            });
    
        });
    }
  }

  yearOnClick(e) {
    this.setState({movies: []});
    e.target.parentElement.previousElementSibling.innerText = e.target.innerText;
    this.setState({year: e.target.innerText});
    this.displayMovies(10, e.target.innerText, this.state.genresMap[this.state.genre], this.state.imdb, this.state.rottenTomatoes);
  }

  genreOnClick(e) {
    this.setState({movies: []});
    e.target.parentElement.previousElementSibling.innerText = e.target.innerText;
    this.setState({genre: this.state.genresMap[e.target.innerText]});
    this.displayMovies(10, this.state.year, this.state.genresMap[e.target.innerText], this.state.imdb, this.state.rottenTomatoes);
  }

  imdbOnClick(e) {
    this.setState({movies: []});
    e.target.parentElement.previousElementSibling.innerText = e.target.innerText;
    this.setState({imdb: e.target.innerText});
    this.displayMovies(10, this.state.year, this.state.genre, e.target.innerText.slice(0, -1), this.state.rottenTomatoes);
  }

  rottenOnClick(e) {
    this.setState({movies: []});
    e.target.parentElement.previousElementSibling.innerText = e.target.innerText;
    this.setState({rottenTomatoes: e.target.innerText});
    this.displayMovies(10, this.state.year, this.state.genre, this.state.imdb, e.target.innerText.slice(0, -1));
  }

  suggestionsOnClick(e) {
    e.target.parentElement.previousElementSibling.innerText = e.target.innerText;
  }

  render() {
    return (
      <div className="container">      
        <SearchContainer onClickHandlers={this.state.onClickHandlers} />
        <MovieList movies={this.state.movies} />
      </div>
    );  
  }
}

export default App;
