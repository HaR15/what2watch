import React from 'react';

class MovieItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    var apiStr = "https://www.omdbapi.com/?apikey=2b5c3b4a&t=" + this.props.movie.title;
    fetch(apiStr)
    .then(res => res.json())
    .then(results => {
      console.log(results)
      if(results.Ratings) {
        this.setState( {
          year: results.Year,
          imdbRating: results.Ratings[0] ? results.Ratings[0].Value : "N/A",
          RTRating: results.Ratings[1] ? results.Ratings[1].Value : "N/A",
          imdbID: results.imdbID ? results.imdbID : "N/A"
        } );  
      }
      
    });
  }
    
  render() {
    return (
      <div className="ratings">
        <a href={"https://www.imdb.com/title/" + this.state.imdbID}><span><b>iMDb:  </b>{this.state.imdbRating}</span></a>
        <span><b>Rotten Tomatoes:  </b>{this.state.RTRating}</span>
      </div>
    )
  }
  
}

export default MovieItem;