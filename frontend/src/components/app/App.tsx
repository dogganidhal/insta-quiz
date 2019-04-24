import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import Main from '../main/Main';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: "#F44A4A" },
    secondary: { main: '#00D293' },
    text: {
      primary: "#434343"
    }
  },
  typography: { 
    useNextVariants: true 
  },
});

export interface IAppProps {
  store: Store;
}

class AppComponent extends Component<IAppProps> {

  public render() {
    return (
      <Provider store={this.props.store}> 
        <MuiThemeProvider theme={theme}>
          <Main/>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

let App = AppComponent;

export default App;