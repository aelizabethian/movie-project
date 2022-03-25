import React, { useState, useEffect } from "react";


//Fetch moves is the prop - getMovies() from the useMoviesHook.
//This component is only here basically to use useEffect so we can fetch the movies
//We do it here because it's not good ot use the hook conditionally.
//Whatever renders it should do so the same everytime, which is why we split it here.

// By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.
const WatchList = (props) => {
  useEffect(() => {
    props.fetchMovies();
  }, [props.fetchMovies]);

  return (
    <div>
      {props.children}
    </div>
  )

}

export default WatchList;