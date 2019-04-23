import React, { Component } from 'react';
import { AuthState } from '../../state/auth-state';
import { loadApp, AuthAction } from '../../actions/auth';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Container } from 'inversify';
import { AppState } from '../../state/app-state';


export interface IMainProps {
  isLoading: boolean;
  isLogged: boolean;
  // Actions
  loadApp(): void;
}

class MainComponent extends Component<IMainProps> {
  
  public componentDidMount() {
    this.props.loadApp();
  }

  public render() {
    if (this.props.isLoading)
      return <h3>Loading</h3>;
    if (this.props.isLogged)
      return <h3>Logged in</h3>;
    else
      return <h3>Logged out</h3>;
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AuthState, Container, AuthAction>, ownProps: IMainProps): IMainProps {
  return {
    ...ownProps,
    loadApp: () => dispatch(loadApp())
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
export default Main as any;