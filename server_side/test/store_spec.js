import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    //by calling makestore, we are calling createStore, which is initialised
    //with an empty reducer, so the initial state is an empty set of map
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Memento', 'Django']
    });
    expect(store.getState()).to.equal(fromJS({
      entries: ['Memento', 'Django']
    }));
  });

});
