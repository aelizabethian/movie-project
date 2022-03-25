import { combineReducers } from "redux";
import MoviesReducer from "./reducer-movies";
import WatchListMoviesReducer from "./reducer-watchlist-movies";
import WatchListCount from "./reducer-watchlist-count";
import TotalPagesReducer from "./reducer-total-pages";
import AuthReducer from './reducer-auth';


// Combine Reducers "turns an object whose values are different reducing functions into a single reducing function you can pass to createStore. The resulting reducer calls every child reducer, and gathers their results into a single state object."


const rootReducer = combineReducers({
  movies: MoviesReducer,
  watchListMovies: WatchListMoviesReducer,
  total_pages: TotalPagesReducer,
  auth: AuthReducer,
  watchListCount: WatchListCount
});

export default rootReducer;
