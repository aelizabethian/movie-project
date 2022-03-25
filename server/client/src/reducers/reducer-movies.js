import { FETCH_MOVIES, FETCH_MOVIE } from '../actions/types';
import { normalize, schema } from 'normalizr';
import _ from 'lodash';

const DEFAULT_STATE = {
  entries: {},
  order: []
}

//Why an entity here? An Entity is a singular object that has a unique identifier associated with it. Array and Object are more generic structures that can't be uniquely identified. 
const moviesSchema = new schema.Entity('movies', undefined);

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_MOVIES:
//By normalizing we'll end up with an object of objects, with each id as an object key instead of the individual movie
      const normalizedMovies = normalize(action.payload.results, [moviesSchema]);

      return {
        // uniq ensures that if a movie was added with FETCH_MOVIE it
        // won't show up twice in the list
        order: _.uniq([...state.order, ...normalizedMovies.result]),
        entries: { ...normalizedMovies.entities.movies, ...state.entries }
      }
    case FETCH_MOVIE:
      return { 
        order: _.union([...state.order], [action.payload.id]), 
        entries: { ...state.entries, [action.payload.id]: action.payload }
      }
    default:
      return state;
  }
}
