import React from 'react';
import { RouteProps } from 'react-router';
import { parse } from 'querystring';
import { QuizTemplateId } from '../../model/quiz-template';
import NavigationBar from '../navigation/NavigationBar';
import { createStyles, withStyles } from '@material-ui/core';

let styles = createStyles({
  background: {

  },
  form: {

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
      <div>
        <NavigationBar />
        <body className={classes.background}>
          <div></div>
        </body>
        <h4>{this.templateId}</h4>
      </div>
    );

  }
}

let CreateQuiz = withStyles(styles)(CreateQuizComponent);

export default CreateQuiz;