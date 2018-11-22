import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD4O6gsH7Il61tQQi6_1e_xhH0lXG9d0QI',
  authDomain: 'client-app-cf7e2.firebaseapp.com',
  databaseURL: 'https://client-app-cf7e2.firebaseio.com',
  projectId: 'client-app-cf7e2',
  storageBucket: 'client-app-cf7e2.appspot.com',
  messagingSenderId: '542122031776'
};
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
//initialise firebase
firebase.initializeApp(firebaseConfig);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);
//firestore

const firestore = firebase.firestore();

const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);

// Add firestore to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

//inital state
const initialState = {};
//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
