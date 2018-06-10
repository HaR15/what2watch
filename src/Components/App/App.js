import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import SearchContainer from '../SearchContainer.js'
import MovieContainer from '../MovieContainer.js'

class App extends React.Component {
  render() {
    return (
      <div className="container">      
        <SearchContainer />
        <MovieContainer />
      </div>
    );  
  }
}

export default App;
