import React, { Component } from 'react';
import { AuthState } from '../../state/auth-state';
import { loadAuthState, AuthAction } from '../../actions/auth';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Container } from 'inversify';
import { AppState } from '../../state/app-state';
import NavigationBar from '../navigation/NavigationBar';
import Login from '../login/Login';
import { CircularProgress, Theme, withStyles } from '@material-ui/core';

let styles = (theme: Theme) => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
});

interface IMainProps {
  isLoading: boolean;
  isLogged: boolean;
  // Actions
  loadApp(): void;
  classes: any; 
}

class MainComponent extends Component<IMainProps> {
  
  public componentDidMount() {
    this.props.loadApp();
  }

  public render() {
    let { classes } = this.props;
    if (this.props.isLoading)
      return <div style={{
          display: "grid",
          placeItems: "center",
          height: "100vh"
        }} 
      > 
        <CircularProgress className={classes.progress} />
      </div>;
    if (this.props.isLogged)
      return <NavigationBar />
    else
      return <Login />;
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AuthState, Container, AuthAction>, ownProps: IMainProps): IMainProps {
  return {
    ...ownProps,
    loadApp: () => dispatch(loadAuthState())
  };
}

function mapStateToProps(state: AppState, ownProperties: IMainProps): IMainProps {
  return {
    ...ownProperties,
    isLoading: state.auth.isLoading,
    isLogged: state.auth.isLogged
  };
}

let Main = connect(mapStateToProps, mapDispatchToProps)(MainComponent);
export default withStyles(styles)(Main) as any;