import React, { useState } from "react";
import SideBar from "./Components/SideBar";
import TaskList from "./Components/TaskList";
import LandingPage from "./Components/LandingPage";
import { useFirebaseWithUser } from "./Firebase";
import { LoadingIcon } from "./icons";

import "./styles.css";

const App = (props) => {
  const [taskPage, setTaskPage] = useState("today");
  const [listName, setListName] = useState("");
  const [firebase, user, loading, error] = useFirebaseWithUser();

  return (
    <div className="container">
      {!user && loading ? (
        <div className="loading-box">
          <LoadingIcon />
        </div>
      ) : user ? (
        <>
          <SideBar
            taskPage={taskPage}
            setTaskPage={setTaskPage}
            setListName={setListName}
            listName={listName}
          />
          <TaskList taskPage={taskPage} listName={listName} />
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default App;
