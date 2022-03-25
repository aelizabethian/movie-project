import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { fetchUser } from '../actions';

const App = (props) => {
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.auth.authenticated);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchUser());
    } 
  }, [authenticated]);

  //props.children are used on components that represent 'generic boxes' and that 'don't know their children ahead of time. It is used to display whatever you include between the opening and closing tags when invoking a component.
  return (
    <AppContainer>
      {props.children}
    </AppContainer>
  )
}

export default App;

const AppContainer = styled.div`
  padding-top: 90px;
`;