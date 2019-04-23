import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Main from '../main/Main';

export interface IAppProps {
  store: Store;
}

class AppComponent extends Component<IAppProps> {

  public render() {
    return (
      <Provider store={this.props.store}> 
        <Main />
      </Provider>
    );
  }
}

let App = AppComponent;

export default App;