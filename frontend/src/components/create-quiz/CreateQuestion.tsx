import * as React from 'react';
import { withStyles, createStyles, FormControl, InputLabel, Input, Theme, TextField, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

let styles = (theme: Theme) => createStyles({
  container: {
    backgroundColor: "#FFFFFF",
    width: 870,
    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)",
    borderRadius: 8,
    padding: 36,
    marginLeft: "auto", 
    marginRight: "auto",
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    flex: 1,
    margin: 16
  }
});

let textFieldTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#F44A4A",
      dark: "#F44A4A",
      light: "#F44A4A"
    }
  },
  typography: { useNextVariants: true },
});

interface ICreateQuestionProps {
  classes: any;
}

class CreateQuestionComponent extends React.Component<ICreateQuestionProps> {

  public render() {
    let { classes } = this.props;
    return (
      <div className={classes.container}>
        <MuiThemeProvider theme={textFieldTheme}>
          <TextField multiline label="Titre du quiz" className={classes.textField}/>
          <TextField multiline label="Description du quiz" className={classes.textField} />
        </MuiThemeProvider>
      </div>
    );
  }
}

let CreateQuestion = withStyles(styles)(CreateQuestionComponent);
export default CreateQuestion;