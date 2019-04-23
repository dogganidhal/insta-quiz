import "reflect-metadata";
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
import { config } from "dotenv";

async function main() {

  let container = await AppModule.load();
  let store = createStore(appReducer, applyMiddleware(thunk.withExtraArgument(container)));

  ReactDOM.render(<Provider container={container}><App store={store}/></Provider> , document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();

}

main();