//This file includes the core fiunctionalities of the application
//note that the functions presented here will not be called directly,
//but via actions.

import {List} from 'immutable';
import {Map} from 'immutable';


//defines empty initial state
export const INITIAl_STATE = new Map();

//allows the setting of a list of entries
export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}


//function that returns the winner based on the number of votes;
//in case of tie, returns both
export function getWinners(vote) {
  console.log('inside getWinners. vote: ', vote)
  if (!vote) return [];

  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  console.log('avotes', aVotes, ' bvotes',  bvotes);

  if (aVotes > bVotes) return [a];
  else if (bVotes > aVotes) return [b];
  else return [a,b];
}

//function called to make a transition in the state of the application
export function next(state) {
  console.log("NEXT WAS CLICKED");
  console.log("entries before next: ", state.get('entries'))
  console.log("getWinner submited with vote: ", state.get('vote'));
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote)')));
  console.log("value returned by getWinners: ", getWinners(state.get('vote)')))
  console.log("entries after next: ", entries);
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}

//function that allows a vote on an element of a pair;
//the '0', is a default value case there are no votes yet.
export function vote(voteState, entry) {
  return voteState.updateIn(
    ['tally', entry],
    0,
    tally => tally + 1
  );
}
