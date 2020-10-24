import React, { createContext, useState, useEffect, useContext } from "react";

const FirebaseContext = createContext(null);
FirebaseContext.displayName = "FirebaseContext";

export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export const AuthUserContext = createContext(null);
AuthUserContext.displayName = "AuthUserContext";

export const AuthUserContextProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });

    return () => listener();
  });

  return (
    <AuthUserContext.Provider value={authUser}>
      {props.children}
    </AuthUserContext.Provider>
  );
};

export const withAuthUser = (Component) => (props) => (
  <AuthUserContext.Consumer>
    {(authUser) => <Component {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default FirebaseContext;
