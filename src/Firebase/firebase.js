import { auth } from "firebase/app";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyA3AU0f35f4B0vKvpruxzYR2vNokwGdWZs",
  authDomain: "todoreactjs-83232.firebaseapp.com",
  databaseURL: "https://todoreactjs-83232.firebaseio.com",
  projectId: "todoreactjs-83232",
  storageBucket: "todoreactjs-83232.appspot.com",
  messagingSenderId: "153497891629",
  appId: "1:153497891629:web:5b8ff1d1daf42c2b8059a4",
  measurementId: "G-MJWSXD3XG3",
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
    }

    this.provider = new auth.GoogleAuthProvider();
    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  signInWithGoogle = () => this.auth.signInWithRedirect(this.provider);

  signInWithGooglePopup = () => this.auth.signInWithPopup(this.provider);

  signOut = () => this.auth.signOut();

  createTask = (userID, description, special_data = {}) => {
    this.db.ref(`tasks/${userID}`).push({
      description,
      created_at: firebase.database.ServerValue.TIMESTAMP,
      done: false,
      ...special_data,
    });

    console.log({ userID, description, ...special_data });
  };

  createNormalTask = (userID, description) =>
    this.createTask(userID, description);

  createImportantTask = (userID, description) =>
    this.createTask(userID, description, { is_important: true });

  createTodayTask = (userID, description) =>
    this.createTask(userID, description, { is_today: true });

  createPlannedTask = (userID, description) =>
    this.createTask(userID, description, {
      days_from_now: 1,
    });

  createListTask = (userID, description, listID) =>
    this.createTask(userID, description, { on_list: listID });

  createList = (userID, name) =>
    this.db.ref(`task_lists/${userID}`).push({
      name,
    });

  deleteList = (userID, listID) => {
    // remove fields from tasks first
    this.db.ref(`tasks/${userID}`).once("value", (snap) => {
      snap.forEach((v) => {
        let task = v.val();
        if (task && task.on_list && task.on_list === listID) {
          // delete dependencie of taks to this list
          this.db
            .ref(`tasks/${userID}/${v.key}/on_list`)
            .remove()
            .then(() => console.log("udane"))
            .catch((e) => console.error(e));
        }
      });
      // delete task list record
      this.db
        .ref(`task_lists/${userID}/${listID}`)
        .remove()
        .then(() => console.log("usunieto liste"))
        .catch((err) => console.error(err));
    });
  };

  userListsRef = (userID) => this.db.ref(`task_lists/${userID}`);

  userTasksRef = (userID) => this.db.ref(`tasks/${userID}`);

  getTasks = (userID, cb) => {
    this.userTasksRef(userID).on("value", (snap) => {
      let tasks = {
        tasklist: [],
        important: [],
        planned: [],
        today: [],
      };
      snap.forEach((v) => {
        let task = v.val();

        if (v.child("days_from_now").val()) {
          tasks.planned.push(task);
        }
        if (v.child("is_important").val()) {
          tasks.important.push(task);
        }
        if (v.child("is_today").val()) {
          tasks.today.push(task);
        }
        if (!v.child("on_list").val()) {
          tasks.tasklist.push(task);
        }
        if (v.child("on_list").val()) {
          const id = v.val().on_list;
          if (!(id in tasks)) {
            tasks[id] = [];
          }

          tasks[id].push(task);
        }
      });

      cb(tasks);
    });

    return this.userTasksRef(userID);
  };

  // getNormalTasks = (userID, cb) =>
  //   this.getTasks(userID, cb, (task) => !task.child("on_list").val());

  // getImportantTasks = (userID, cb) =>
  //   this.getTasks(userID, cb, (task) => task.child("is_important").val());

  // getTodayTasks = (userID, cb) =>
  //   this.getTasks(userID, cb, (task) => task.child("is_today").val());

  // getPlannedTasks = (userID, cb) =>
  //   this.getTasks(userID, cb, (task) => task.child("days_from_now").val());

  // getTasksFromList = (userID, listID, cb) =>
  //   this.getTasks(
  //     userID,
  //     cb,
  //     (task) => task.val().on_list && task.val().on_list === listID
  //   );
}

export default Firebase;
