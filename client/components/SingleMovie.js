import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { fetchSingleMovie } from "../store/singleMovie";

class SingleMovie extends React.Component {

  componentDidMount(){
    this.props.getMovie(this.props.match.params.id);
  }

  render(){
    const movie = this.props.movie;
    return (
      <div>
        <h3>{movie.name}</h3>
        <img src={movie.imageUrl} />
        <p>Description: {movie.description}</p>
        <p>Genre: {movie.genre}</p>
        <p>Price: ${movie.price}</p>
      </div>
    )
  }
}

const mapState = (state) => ({
  movie: state.movie
});

const mapDispatch = (dispatch) => ({
  getMovie: (id) => dispatch(fetchSingleMovie(id))
});

export default connect(mapState, mapDispatch)(SingleMovie);