import {expect} from 'chai';
import {List, Map} from 'immutable';
{/* a module to increment  a value by 1,
    it is also a test and assertion module
*/}

describe('immutability', () => {

  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }
    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }
    it('is immutable', () => {
      let state = List.of('Memento', 'Django Unchained');
      let nextState = addMovie('state', 'Inception');
      expect(nextState).to.equal(List.of(
        'Memento',
        'Django Unchained',
        'Inception'
      ));
      expect(state).to.equal(List.of(
        'Memento',
        'Django Unchained'
      ));
    });
  });

  describe('a tree', () => {
      function addMovie(currentState, movie) {
        return currentState.update('movies', movies => movies.push(movie));
      }

      it('is immutable', () => {
        let state = Map({
          movies: List.of('Memento', 'Django Unchained')
        });
        let nextState = addMovie('state', 'Inception');
        expect(nextState).to.equal(Map({
          movies: List.of(
            'Memento',
            'Django Unchained',
            'Inception'
          )
        }));
        expect(state).to.equal(Map({
          movies: List.of(
          'Memento',
          'Django Unchained'
        )
        }));
      });
  });

});
