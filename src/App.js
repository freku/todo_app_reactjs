import React, { useContext, useState } from "react";
import SideBar from "./Components/SideBar";
import TaskList from "./Components/TaskList";
import { FirebaseContext } from "./Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ReactComponent as LoadingIcon } from "./icons/loading.svg";

import "./styles.css";

const App = (props) => {
  const [taskPage, setTaskPage] = useState("today");
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);

  return (
    <div className="container">
      {!user && loading ? (
        <div className='loading-box'>
          <LoadingIcon />
        </div>
      ) : user ? (
        <>
          <SideBar taskPage={taskPage} setTaskPage={setTaskPage} />
          <TaskList taskPage={taskPage} />
        </>
      ) : (
        <div>
          <h1 onClick={firebase.signInWithGoogle}>Zaloguj sie</h1>
        </div>
      )}
    </div>
  );
};

export default App;
