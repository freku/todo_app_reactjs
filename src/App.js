import React from "react";
import Firebase, { FirebaseContext, AuthUserContextProvider } from "./Firebase";
import SideBar from './Components/SideBar';
import TaskList from './Components/TaskList';
import './styles.css';

const App = (props) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <AuthUserContextProvider>
        <div className="container">
          <SideBar />
          <TaskList />
        </div>
      </AuthUserContextProvider>
    </FirebaseContext.Provider>
  );
};

export default App;
