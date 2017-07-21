import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Memento']};
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      entries: ['Memento']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Memento', 'Django']
    });
    const action = {type; 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Memento', 'Django']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Memento', 'Django']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Memento'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal({
      vote: {
        pair: ['Memento', 'Django'],
        tally: {'Memento': 1}
      },
      entries: []
    });
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Memento']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Memento']
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Memento', 'Django']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Memento'},
      {type: 'VOTE', entry: 'Django'},
      {type: 'VOTE', entry: 'Memento'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, map());
    expect(finalState).to.equal({
      winner: 'Memento'
    });
  });

});
