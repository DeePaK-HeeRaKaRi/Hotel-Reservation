import React,{ createContext, useReducer } from 'react';
const INITIAL_STATE = {
  city : undefined,
  dates : [],
  options : {
    adult : undefined,
    children : undefined,
    room : undefined,
  }
};
export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state,action) => {
  switch(action.type) {
  case 'NEW_SEARCH':
    console.log('action.payload',action.payload);
    return action.payload;
  case 'RESET_SEARCH':
    return INITIAL_STATE;
  default: 
    return state;
  }
};
console.log('initial',INITIAL_STATE);
export const SearchContextProvider = ({ children }) => {
  // children is our component\

  const [state,dispatch] = useReducer(SearchReducer,INITIAL_STATE);
  console.log('children',children);
  return (
    <SearchContext.Provider 
      value={{
        city : state.city,
        dates : state.dates,
        options : state.options,
        dispatch
      }}>
      {children}
    </SearchContext.Provider>
  );
};