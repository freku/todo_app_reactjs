import React, { useContext, useState } from "react";
import SideBar from "./Components/SideBar";
import TaskList from "./Components/TaskList";
import { AuthUserContext, FirebaseContext } from "./Firebase";
import "./styles.css";

const App = (props) => {
  const [taskPage, setTaskPage] = useState(null);
  const authUser = useContext(AuthUserContext);
  const firebase = useContext(FirebaseContext);

  return (
    <div className="container">
      {authUser ? (
        <>
          <SideBar taskPage={taskPage} setTaskPage={setTaskPage} />
          <TaskList taskPage={taskPage} />
        </>
      ) : (
        <>
          <div>
            <h1 onClick={firebase.signInWithGoogle}>Zaloguj sie</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
