import axios from "axios";
import { FETCH_MOVIES, FETCH_MOVIE, AUTH_USER, AUTH_ERROR, ADD_MOVIE, FETCH_WATCHLIST_MOVIES } from './types';

export const fetchMovies = (page = 1) => dispatch => {
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
  ).then(function (response) {
    dispatch({ type: FETCH_MOVIES, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchMovie = (id) => dispatch => {
  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&include_adult=false&include_video=false`
  ).then(function (response) {
    dispatch({ type: FETCH_MOVIE, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

//Note that the callback() below is a redirect after they've signed up
export const signup = (formProps, callback) => dispatch => {
  axios.post(
    '/auth/signup',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};

//Callback() is redirect after signin - see components/auth/signin for the callback definition

//JUST FYI - the formProps that are included in the body - this is an overall structure of that (from https://stackoverflow.com/questions/51415439/how-can-i-add-raw-data-body-to-an-axios-request)

// axios.post(
//   baseUrl + 'applications/' + appName + '/dataexport/plantypes' + plan, 
//   body, 
//   {
//       headers: { 
//           'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
//           'Content-Type' : 'text/plain' 
//       }
//   }
// ).then(response => {
// this.setState({data:response.data});
// console.log(this.state.data);
// });


export const signin = (formProps, callback) => dispatch => {
  axios.post(
    'http://localhost:5000/auth/signin',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};


//NOTICE THAT ALL functions that are done on a user have the config header so that token can get passed
export const fetchUser = () => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };

  axios.get(
    'http://localhost:5000/auth/current_user',
    config
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const signout = (callback) => dispatch => {
  localStorage.removeItem('token');

  dispatch({ type: AUTH_USER, payload: '' });
  callback()
};

export const addMovieToWatchList = (movie) => dispatch => {
  console.log(movie);
  
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };

  axios.post(
    'http://localhost:5000/api/watchlist',
    { movie },
    config
  ).then(function (response) {
    dispatch({ type: ADD_MOVIE, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchWatchListMovies = () => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };

  axios.get(
    'http://localhost:5000/api/watchlist',
    config
  ).then(function (response) {
    dispatch({ type: FETCH_WATCHLIST_MOVIES, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};