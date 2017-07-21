//This file implements the logic of the reducer
//it simply maps the reducer function called, with the
//logical functions implemented in core

import {setEntries, next, vote, INITIAl_STATE} from './core';

//searches for the function called, and calls it;
//sets initial state if no state is defined;
//returns the same state if no function is found

export default function reducer(state = INITIAl_STATE, action) {
  //Figure out which function to call and call it
  switch(action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      //without modularization
      //  return vote(state, action.entry)
      //WITH MODULARIZATION
      return state.update('vote',
                          voteState => vote(voteState, action.entry));
  }
  return state;
}
