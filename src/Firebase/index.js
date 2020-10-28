import FirebaseContext, {
  AuthUserContext,
  withAuthUser,
  withFirebase,
  AuthUserContextProvider,
} from "./context";
import Firebase from "./firebase";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useFirebaseWithUser = () => {
  const firebase = useContext(FirebaseContext);
  const [user, loading, error] = useAuthState(firebase.auth);

  return [firebase, user, loading, error];
};

export default Firebase;

export {
  FirebaseContext,
  AuthUserContext,
  withAuthUser,
  withFirebase,
  AuthUserContextProvider,
  useFirebaseWithUser,
};
