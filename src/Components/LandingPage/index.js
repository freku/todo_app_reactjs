import React, { useContext } from "react";
import { FirebaseContext } from "../../Firebase";
import { GoogleIcon } from "../../icons";

import "./styles.css";

const LandingPage = (props) => {
  const firebase = useContext(FirebaseContext);

  return (
    <div className="landing-box">
      <p>TODO</p>
      <p>CENTER</p>
      <div onClick={firebase.signInWithGoogle} className="google-btn">
        <GoogleIcon />
        <p>Login With Google</p>
      </div>
    </div>
  );
};

export default LandingPage;
