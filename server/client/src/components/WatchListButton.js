import React from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToWatchList } from '../actions'

const WatchListButton = () => {
  //Because the id will be in the route path, we can use this hook on react-router-DOM to grab it and find the right movie in our state variable.
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(state => state.movies.entries[id]);
  const authenticated = useSelector(state => state.auth.authenticated);

  if (authenticated) {
    return (
      <button onClick={() => dispatch(addMovieToWatchList(movie))}>Add to Watchlist</button>
    )
  } else {
    return null;
  }
};

export default WatchListButton;