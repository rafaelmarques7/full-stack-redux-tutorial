//This file is responsible for managing the REDUX store
//a Redux store will be the central point of our application
//it holds the current state ( which can be called at any point with .getState)
//and is able to handle actions which evolve the state from one point to another
import {createStore} from 'redux';
import reducer from './reducer';

//makeStore is a function that creates a store with a reducer function previously
//defined. note that we pass no arguments to the reducer, which means it will
//be initialised with an initially empty State ( Map() )
export default function makeStore() {
  return createStore(reducer);
}
