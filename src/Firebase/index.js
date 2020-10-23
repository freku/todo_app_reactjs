import FirebaseContext, {
  AuthUserContext,
  withAuthUser,
  withFirebase,
  AuthUserContextProvider,
} from "./context";
import Firebase from "./firebase";

export default Firebase;

export { FirebaseContext, AuthUserContext, withAuthUser, withFirebase, AuthUserContextProvider };
