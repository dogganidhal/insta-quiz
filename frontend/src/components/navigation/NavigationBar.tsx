import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Avatar, createMuiTheme, MuiThemeProvider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import logo from "../../assets/logo.svg"
import "./navigation-bar.css";
import MenuIcon from '@material-ui/icons/Menu';
import { ThunkDispatch } from 'redux-thunk';
import { AuthState } from '../../state/auth-state';
import { Container } from 'inversify';
import { AuthAction, loadAuthState, logout } from '../../actions/auth';
import { AppState } from '../../state/app-state';
import { User } from '../../model/user';
import { connect } from 'react-redux';


let styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    alignItems: "center"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  userNameText: {
    margin: 4
  }
});

let appBarTheme = createMuiTheme({
  palette: {
    primary: { main: "#FFFFFF" },
    secondary: { main: "#F44A4A" }
  },
  typography: {
    useNextVariants: true,
  },
})

interface INavigationBarProps {
  // Properties
  classes: any;
  user: User;
  // Actions
  logout(): void;
}

interface INavigationBarState {
  anchorEl: any;
  isLogoutAlertDialogOpen: boolean;
}

class NavigationBarComponent extends React.Component<INavigationBarProps, INavigationBarState> {

  constructor(props: INavigationBarProps) {
    super(props);
    this.state = {
      anchorEl: null,
      isLogoutAlertDialogOpen: false
    }
  }

  private closeUserDropDown() {
    this.setState({ anchorEl: null });
  }

  private closeLogoutAlertDialog() {
    this.setState({ isLogoutAlertDialogOpen: false });
  }

  private openUserDropDown(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({ anchorEl: event.currentTarget });
  }

  private openLogoutAlertDialog() {
    this.setState({ anchorEl: null, isLogoutAlertDialogOpen: true });
  }

  private logout() {
    this.closeUserDropDown();
    this.props.logout();
  }

  public render() {
    let { classes } = this.props;
    let { anchorEl } = this.state;
    let open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={appBarTheme} >
          <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <a className={classes.grow} href="/" >
                <img src={logo} alt="logo" />
              </a>
              <div>
                <span>
                  <Typography noWrap={true} inline={true}>
                    Bonjour
                </Typography>
                  <Typography inline={true} color="secondary" className={classes.userNameText}>
                    { this.props.user.fullName }
                </Typography>
                </span>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.openUserDropDown.bind(this)}
                  color="inherit"
                >
                  <Avatar color="#F44A4A">{ this.props.user.fullName.substring(0, 1) }</Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.closeUserDropDown.bind(this)}
                >
                  <MenuItem onClick={this.openLogoutAlertDialog.bind(this)}>Se déconnecter</MenuItem>
                </Menu>
              </div>

            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
        <Dialog
          open={this.state.isLogoutAlertDialogOpen}
          onClose={this.closeLogoutAlertDialog.bind(this)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Voulez-vous vraiment vous déconnecter?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Voulez-vous vraiment vous déconnecter?
              Vous pouvez vous reconnecter à tout moment.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeLogoutAlertDialog.bind(this)} color="default">
              Abandonner
            </Button>
            <Button onClick={this.logout.bind(this)} color="primary" autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AuthState, Container, AuthAction>, ownProps: INavigationBarProps): INavigationBarProps {
  return {
    ...ownProps,
    logout: () => dispatch(logout())
  };
}

function mapStateToProps(state: AppState, ownProperties: INavigationBarProps): INavigationBarProps {
  return {
    ...ownProperties,
    user: state.auth.user!
  };
}

let NavigationBar = connect(mapStateToProps, mapDispatchToProps)(NavigationBarComponent)
export default withStyles(styles)(NavigationBar) as any;