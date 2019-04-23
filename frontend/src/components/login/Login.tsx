import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { ThunkDispatch } from 'redux-thunk';
import { AuthState } from '../../state/auth-state';
import { Container } from 'inversify';
import { AuthAction, login } from '../../actions/auth';
import { connect } from 'react-redux';
import "./login.css";
import { CircularProgress, Theme, withStyles } from '@material-ui/core';

let styles = (theme: Theme) => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
});

interface ILoginProps {
  isLoading: true;
  classes: any;
  // Actions 
  login(token: string): void;
}

class LoginComponent extends React.Component<ILoginProps> {
  
  private onSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    let token = (response as GoogleLoginResponse).getAuthResponse().id_token;
    this.props.login(token);
  }

  private onFailure(error: any) {

  }

  public render() {
    let { classes, isLoading } = this.props;
    return (
      <div style={{
        display: "grid",
        placeItems: "center",
        height: "100vh"
      }} >
        <div>
          {
            isLoading ?
              <CircularProgress className={classes.progress} /> :
              <GoogleLogin
                className="Google-Login-Button"
                clientId="557540640258-2t3iv1vs2jbv5fcrffniushftg6j8ps3.apps.googleusercontent.com"
                buttonText="Se connecter avec Google"
                onSuccess={this.onSuccess.bind(this)}
                onFailure={this.onFailure.bind(this)}
              />
          }
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AuthState, Container, AuthAction>, ownProps: ILoginProps): ILoginProps {
  return {
    ...ownProps,
    login: (token) => dispatch(login(token))
  };
}

let Login = connect(null, mapDispatchToProps)(LoginComponent);
export default withStyles(styles)(Login) as any;