import React from 'react';
import NavigationBar from '../navigation/NavigationBar';
import CreateQuizTemplates from '../create-quiz-templates/CreateQuizTemplates';
import UserQuizzes from '../user-quizzes-section/UserQuizzesSection';

interface IDashboardProps {

}

class DashboardComponent extends React.Component<IDashboardProps, any> {

  public render() {
    return (
      <div>
        <NavigationBar />
        <CreateQuizTemplates />
        <UserQuizzes />
      </div>
    );
  }

}

let Dashboard = DashboardComponent;

export default Dashboard;
