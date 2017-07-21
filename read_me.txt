-> What
We will build a voting app which will opose 2 things.
The most voted of each pair, will be rearranged and paired again.
The voting continues untill only one thing wins.

-> How
There will be two applications:
-a browser app with react, which will provide the interface;
-a server app that handles the voting logic, with node;
-the communication between both will be done with webSockets.
-Redux will be used to organize the application of the browser and server side;
-the state will be hold with Immutable data structures;

-> The application state tree
a redux app often begins by thinking about the application state data structure.
this is what describes what's going on in an application at any given time.
In Redux, the application state is all stored in one single tree structure.
Everything there is to know about the application's state is stored in one data
structure formed out of maps and arrays.
One of the most relevant consequences of this, is it let's your think about the
application state in isolation from the application's behabior.
The state is pure data. It does not have methods or functions. And it is not
hidden away inside objects.

-an initial state for the app might be the collection of items that will be
voted on - the "ENTRIES"

after the vote had begun, there  should be a way to tell what is currently
being voted on. So in this state, there might be a vote entry in the state,
which hols the - "PAIR" - of items currently under vote. The pair should be taken from
the entries collection.
also, we need to store the votes. we wil call the structure "TALLY"

After a voting of a pair is done, the winning entry goes back to the Entries
strucuture, as last, so later it will be oposed to something else.

This type of behaviour can be thaught of as a cycle, until there are no more pair
to votes, in the entries structure, and a winner is declared.



-> initialising the project
npm init
npm install --save-dev babel-core babel-cli babel-preset-es2015
npm install --save-dev mocha chai
The babel modules are responsible for translating ES5 (Javascript new features)
into plain javascript so it can be interpreted.
Mocha and Chai are test and assertion frameworks, respectively

"./node_modules/mocha/bin/mocha --compilers js:babel-core/register --recursive"
is a command to run tests
we can store this command in our package.json!
we also need to enable Babel's language support
test watch  watches for changes in code and runs tests after each change

add this to package.json
"scripts": {
  "test": "mocha --compilers js:babel-core/register --recursive",
  "test:watch": "npm run test -- --watch"
},
"babel": {
  "presets": ["es2015"]
}


->continuing the application
An important fact about redux is the following:
a state is not just a tree, but an IMMUTABLE tree.

Normally, in an application, we would have code that changes the state
of the application by making updates to the tree.
In redux, this is not the way to do it, since state trees are immutable.

An update in state requires a new state tree that reflects the changes.
This is done by calling a function that takes the current state
and returns a new one.
This will have some important consequences, namely, it allows to store the
history of all states of the application. This means doing something like undo,
or jumping to a previous state, is really simple.


->Action and Reducers
Although it is needed to build directly the core logic functions,
redux dont call them directly. There is a layer of abstraction between the functions
and the outside world - ACTIONS - a simple data structure that describes a change
that should occur in the app.
ACTION : {type: func_name, attribute*: attr_prop}, *optional

A REDUCER is a generic function that takes any kind of action,
along with the current state, and invokes the core function that matches the action.

NOTE:
a reducer can update the whole state of the application;
however, in large apps, its not a good idea to update to whole state,
for various reasons - the function would need to know the whole state;
-the update of the whole state is slower than the update of only a part;
So, it is a goodidea to, whenever possible, make operations work on small pieces
of the state -> subtree's -> this is called MODULARIZATION


note that by now we have not used REDUX itself.
to use redux, we create a store, like This
    import {createStore} from 'redux';
    const store = createStore(reducer);
note that the store is initialised with a reducer, that we have already created,
and which handles the mapping to the core logic functionallity we have implemented.
by calling the store with a DISPATCH call, and passing an ACTION object,
it is exactly like calling a reducer. The only diference is this is handled by
the store itself. example:
    store.dispatch({type: 'NEXT'});

author note about redux
'It is quite remarkable just how small the integration surface area between our
application code and Redux actually is. Because we have a generic reducer function,
that's the only thing we need to let Redux know about. The rest is all in our own,
non-framework-specific, highly portable and purely functional code'

-> SERVER OPERATION
Our server now operates essentially like this:

1) A client sends an action to the server.
2) The server hands the action to the Redux Store.
3) The Store calls the reducer and the reducer executes the logic related to the action.
4) The Store updates its state based on the return value of the reducer.
5) The Store executes the listener function subscribed by the server.
6) The server emits a 'state' event.
7) All connected clients - including the one that initiated the original action - receive the new state.


-> ESTADO ACTUAL
webpack-dev-server on client side creates the client side interface
npm run start on server side creates the server
a socket is connecting both!
