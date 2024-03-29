import React from 'react';
import NavigationBar from '../navigation/NavigationBar';
import CreateQuizTemplates from './CreateQuizSection';
import UserQuizzes from './UserQuizzesSection';
import UserSubmissions from './UserSubmissionsSection';

interface IDashboardProps {

}

class DashboardComponent extends React.Component<IDashboardProps, any> {

  public render() {
    return (
      <div>
        <NavigationBar />
        <div style={{marginTop: 64}}>
          <CreateQuizTemplates />
          <UserQuizzes />
          <UserSubmissions />
        </div>
      </div>
    );
  }

}

let Dashboard = DashboardComponent;

export default Dashboard;
