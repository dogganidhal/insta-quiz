import "reflect-metadata";
import "typeface-roboto";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import AppModule from './modules/app-module';
import { Provider } from "inversify-react";
import { createStore, applyMiddleware } from "redux";
import { appReducer } from "./reducers/app-reducer";
import thunk from "redux-thunk";
import "moment/locale/fr";
import moment from "moment";
import Firebase from "firebase";

async function main() {

  let container = await AppModule.load();
  let store = createStore(appReducer, applyMiddleware(thunk.withExtraArgument(container)));
  var config = {
    apiKey: "AIzaSyB21Nd2mYmPkCTqFZbT3Zx7qjfS3Ih_Ppc",
    authDomain: "insta-quiz-1555682215720.firebaseapp.com",
    databaseURL: "https://insta-quiz-1555682215720.firebaseio.com",
    projectId: "insta-quiz-1555682215720",
    storageBucket: "insta-quiz-1555682215720.appspot.com",
    messagingSenderId: "557540640258"
  };
  Firebase.initializeApp(config);
  moment.locale("fr");

  ReactDOM.render(<Provider container={container}><App store={store}/></Provider> , document.getElementById('root'));

  serviceWorker.unregister();

}

main();