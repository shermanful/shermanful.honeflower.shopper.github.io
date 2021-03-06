import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies, deleteMovie } from "../store/movies";

class AllMovies extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getMovies();
  }

  handleClick(id, event) {
    event.preventDefault();
    this.props.deleteMovie(id);
  }

  render() {
    const movieData = this.props.movies;

    const movieList = movieData.map((movie) => (
      <div className="all-movies" key={movie.id}>
        <Link to={`/movies/${movie.id}`}>
          <h3>{movie.name}</h3>
          <img src={movie.imageUrl} />
        </Link>
        {this.props.isAdmin ? <button type="submit" onClick={(event) => this.handleClick(movie.id, event)}>X</button> : ""}
      </div>
    ));

    return (
      <main>
        <h2>Movie List</h2>
        <div id="all-movies">
          {movieData.length > 1 ? movieList : "No Movies Available"}
        </div>
      </main>
    );
  }
}

const mapState = (state) => ({
  movies: state.movies,
  isAdmin: state.auth.isAdmin
});

const mapDispatch = (dispatch) => ({
  getMovies: () => dispatch(fetchMovies()),
  deleteMovie: (id) => dispatch(deleteMovie(id)),
});

export default connect(mapState, mapDispatch)(AllMovies);
