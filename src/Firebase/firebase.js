import firebase, { auth } from "firebase/app";
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
  };

  createNormalTask = (userID, description) =>
    this.createTask(userID, description);

  createImportantTask = (userID, description) =>
    this.createTask(userID, description, { is_important: true });

  createTodayTask = (userID, description) =>
    this.createTask(userID, description, { is_today: true });

  createPlannedTask = (userID, description) => {
    const timestamp = new Date().getTime();

    this.createTask(userID, description, {
      deadline: timestamp + 1000 * 3600 * 24,
    });
  };

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
        if (v.child("deadline").val()) {
          tasks.planned.push(v);
        }
        if (v.child("is_important").val()) {
          tasks.important.push(v);
        }
        if (v.child("is_today").val()) {
          tasks.today.push(v);
        }
        if (!v.child("on_list").val()) {
          tasks.tasklist.push(v);
        }
        if (v.child("on_list").val()) {
          const id = v.val().on_list;
          if (!(id in tasks)) {
            tasks[id] = [];
          }

          tasks[id].push(v);
        }
      });

      cb(tasks);
    });

    return this.userTasksRef(userID);
  };

  getTaskByID = (userID, taskID, cb) => {
    this.userTasksRef(userID).child(taskID).on("value", cb);
  };

  removeTask = (userID, taskID) =>
    this.userTasksRef(userID).child(taskID).remove();

  updateTask = (userID, taskID, data) =>
    this.userTasksRef(userID).child(taskID).update(data);

  setTaskDescription = (userID, taskID, description) =>
    this.userTasksRef(userID).child(taskID).update({ description });

  setTaskCheck = (userID, taskID, done) =>
    this.userTasksRef(userID).child(taskID).update({ done });

  setTaskImportant = (userID, taskID, is_important) =>
    this.userTasksRef(userID).child(taskID).update({ is_important });

  setTaskToday = (userID, taskID, is_today) =>
    this.userTasksRef(userID).child(taskID).update({ is_today });

  setTaskDeadline = (userID, taskID, deadline) =>
    this.userTasksRef(userID).child(taskID).update({ deadline });

  removeTashDeadline = (userID, taskID) =>
    this.userTasksRef(userID).child(taskID).child("deadline").remove();

  getSubtasks = (userID, taskID, cb) =>
    this.child(`${taskID}/subtasks`).on("value", cb);

  addSubtaskToTask = (userID, taskID, description) =>
    this.userTasksRef(userID)
      .child(`${taskID}/subtasks`)
      .push({ description, done: false });

  setSubtaskDescription = (userID, taskID, subtaskID, description) =>
    this.userTasksRef(userID)
      .child(`${taskID}/subtasks/${subtaskID}`)
      .update({ description });

  setSubtaskCheck = (userID, taskID, subtaskID, done) =>
    this.userTasksRef(userID)
      .child(`${taskID}/subtasks/${subtaskID}`)
      .update({ done });

  removeSubtask = (userID, taskID, subtaskID) =>
    this.userTasksRef(userID).child(`${taskID}/subtasks/${subtaskID}`).remove();
}

export default Firebase;
