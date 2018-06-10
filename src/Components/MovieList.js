import React from 'react';
import MovieItem from './MovieItem.js'

class MovieList extends React.Component {
  
  createMovieItem(movie, i) {

    function handleClick() {
      var mI = document.getElementById('movieItem' + i);
      var d = document.getElementById('movie' + i);

      var a = document.querySelector('#movieItem' + i + ' > a')
      if(a.classList.contains('collapsed')){
        mI.style.width = 'auto';
        window.scroll(0, -200);        
      } else {
        mI.style.width = '100%';
        if(mI.getBoundingClientRect().bottom >= (window.innerHeight || document.documentElement.clientHeight)) {
          window.scroll(0, 500);
        } 
        //window.scroll(0, 200);
      }
    }

    var styles = {
      float: 'left'
    }

    var styles2 = {
      width: '100%'
    }

    return (
      <div className="list-group-item movieItem" id={"movieItem" + i} >
        <a style={styles} onClick={handleClick} className="poster" data-toggle="collapse" href={"#movie" + i} aria-expanded="false" aria-controls={"#movie" + i}>
          <img src={"http://image.tmdb.org/t/p/w154" + movie.poster_path} className="list-group-image"/>
        </a>
        <div className="collapse" id={"movie" + i}>
          <div className="movieDescription card card-body">
            <span className="title">{movie.title}</span>
            <span className="year"><b>Year:  </b> {movie.release_date.slice(0, 4)}</span>
            <MovieItem movie={movie} />
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    );
  }
  
  render() {
    return (
      <div className="list-group moviesContainer">
        {this.props.movies.map(this.createMovieItem)}
      </div>
    );
  }
  
}

export default MovieList;