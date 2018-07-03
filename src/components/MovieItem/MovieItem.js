import React from 'react';
import MovieItemStyle from './MovieItem.css';

class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
    
  render() {
    return (
      <div className="ratings">
        <a href={"https://www.imdb.com/title/" + this.props.movie.imdbID}><span><b>iMDb:  </b>{this.props.movie.imdb}</span></a>
        <span><b>Rotten Tomatoes:  </b>{this.props.movie.rottenTomatoes}</span>
      </div>
    )
  }
  
}

export default MovieItem;