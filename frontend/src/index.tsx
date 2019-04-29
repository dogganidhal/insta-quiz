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
import { getConfig, EnvironmentConfig } from "./config/config";
import { Types } from "./constants/types";

async function main() {

  let config = getConfig();
  let container = await AppModule.load(config);
  let store = createStore(appReducer, applyMiddleware(thunk.withExtraArgument(container)));
  
  moment.locale("fr");

  ReactDOM.render(
    <Provider 
      container={container}>
      <App 
        store={store}
        googleClientId={container.get<EnvironmentConfig>(Types.EnvironmentConfig).googleOAuth2ClientId} />
    </Provider>, 
    document.getElementById('root')
  );

  serviceWorker.unregister();

}

main();