import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export default class App extends Component {
  state = {
    token: undefined
  };
  public render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId="557540640258-2t3iv1vs2jbv5fcrffniushftg6j8ps3.apps.googleusercontent.com"
          onSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
            this.setState({ token: (response as GoogleLoginResponse).getAuthResponse().id_token })
          }}
          onFailure={(...args) => {
            alert(args);
          }}
        />
        <p>{this.state.token}</p>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
