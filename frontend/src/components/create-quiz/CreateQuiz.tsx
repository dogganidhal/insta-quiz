import React from 'react';
import { RouteProps } from 'react-router';
import { parse } from 'querystring';
import { QuizTemplateId } from '../../model/quiz-template';
import NavigationBar from '../navigation/NavigationBar';
import { createStyles, Typography, withStyles, ButtonBase } from '@material-ui/core';
import { Add, Send } from "@material-ui/icons";
import CreateQuestion from './CreateQuestion';

let styles = createStyles({
  container: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "#F2F2F2"
  },
  body: {
    marginTop: 64,
    paddingTop: 36
  },
  bottomToolbar: {
    position: "fixed",
    right: 0,
    left: 0,
    bottom: 0,
    background: "#FFFFFF",
    alignItems: 'center',
    display: "flex",
    flexDirection: "row-reverse"
  },
  shareButton: {
    width: 279,
    height: 64,
    background: "#F44A4A",
    borderRadius: 8,
    alignSelf: "right",
    margin: 16,
  },
  addQuestionButton: {
    width: 279,
    height: 64,
    background: "#F44A4A",
    borderRadius: 8,
    alignSelf: "right",
    marginTop: 16, marginBottom: 16
  }
});

export interface CreateQuizProps extends RouteProps {
  classes: any;
}

class CreateQuizComponent extends React.Component<CreateQuizProps, any> {
  
  private templateId?: string;

  public componentWillMount() {
    if (this.props.location) {
      let queryString = parse(this.props.location.search.replace("?", ""));
      if (queryString.template === QuizTemplateId.EMPTY || queryString.template === QuizTemplateId.MCQ || queryString.template === QuizTemplateId.FORM) {
        this.templateId = queryString.template as QuizTemplateId;
        return;
      }
    }
    this.templateId = QuizTemplateId.EMPTY;
  }

  public render() {
    
    let { classes } = this.props;
    return (
      <div className={classes.container}>
        <NavigationBar />
        <body className={classes.body}>
          <CreateQuestion />
        </body>
        <div className={classes.bottomToolbar}>
          <ButtonBase className={classes.shareButton}>
            <Send style={{ color: "#FFFFFF" }} />
            <Typography style={{ color: "#FFFFFF" }}>&ensp;&ensp;PARTAGER</Typography>
          </ButtonBase>
          <ButtonBase className={classes.addQuestionButton}>
            <Add style={{ color: "#FFFFFF" }} />
            <Typography style={{ color: "#FFFFFF" }}>&ensp;&ensp;NOUVELLE QUESTION</Typography>
          </ButtonBase>
        </div>
      </div>
    );

  }
}

let CreateQuiz = withStyles(styles)(CreateQuizComponent);

export default CreateQuiz;