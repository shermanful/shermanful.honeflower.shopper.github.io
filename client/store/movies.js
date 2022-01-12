import axios from 'axios';

//action types
const SET_MOVIES = 'SET_MOVIES';
const CREATE_MOVIE = 'CREATE_MOVIE';

//action creators
export const setMovies = (movies) => ({
  type: SET_MOVIES,
  movies
});

export const _createMovie = (movie) => ({
  type: CREATE_MOVIE,
  movie
})

//thunks
export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/movies');
      dispatch(setMovies(data));
    } catch (err){
      console.log(err);
    }
  };
};

export const createMovie = (movie) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post("/api/movies", movie);
      dispatch(_createMovie(created));
    } catch (err){
      console.log(err);
    }
  };
};

const initialState = [];

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.movies;
    case CREATE_MOVIE:
      return [...state, action.movie];
    default:
      return state;
  }
}