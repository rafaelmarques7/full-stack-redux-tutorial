import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Memento', 'Django');
      const nextState = setEntries(state, entries);
      expect nextState.to.equal(Map({
        entries: List.of('Memento', 'Django')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Memento', 'Django'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Memento', 'Django')
      }));
    });

  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Memento', 'Django', 'Inception')
      });
      const nextState = next(state);
      expect(nextState).to.equal({
        vote: Map({
          pair: List.of('Memento','Django')
        }),
        entries: List.of('Inception')
      });
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Memento', 'Django'),
          tally: Map({
            'Memento': 5,
            'Django': 2
          })
        }),
        entries: List.of('Insomnia', 'Kill Bill')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Insomnia', 'Kill Bill'),
        }),
        entries: List.of('Memento')
      }));
    });

    it('puts both from tied vote back to entries', () =>{
      const state = Map({
        vote: Map({
          entries: List.of('Memento', 'Django')
          tally: Map({
            'Memento': 3,
            'Django': 3
          })
        }),
        entries: List.of('Insomnia', 'Kill Bill')
      });
      const nextState = next(state);
      expect(nextState).to.equal({
        vote: Map({
          pair: List.of('Insomnia', 'Django')
        }),
        entries: List.of('Memento', 'Django', 'Insomnia', 'Kill Bill')
      });
    });

    it('marks winner when just one entry left', () = >{
      const state = Map({
        vote: Map({
          pair: List.of('Memento', 'Django'),
          tally: Map({
            'Memento': 4,
            'Django': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Memento'
      }));
    })
  });

  describe('vote', () => {
  it('creates a tally for the voted entry', () => {
    const state = Map({
      pair: List.of('Trainspotting', '28 Days Later')
    });
    const nextState = vote(state, 'Trainspotting')
    expect(nextState).to.equal(Map({
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map({
        'Trainspotting': 1
      })
    }));
  });

  it('adds to existing tally for the voted entry', () => {
    const state = Map({
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map({
        'Trainspotting': 3,
        '28 Days Later': 2
      })
    });
    const nextState = vote(state, 'Trainspotting');
    expect(nextState).to.equal(Map({
      pair: List.of('Trainspotting', '28 Days Later'),
      tally: Map({
        'Trainspotting': 4,
        '28 Days Later': 2
      })
    }));
  });

});

});
