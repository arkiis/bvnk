import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { history } from "../../../history";

import { config } from "../../../authService/firebase/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

let firebaseAuth = firebase.auth();

export const signupWithFirebase = (email, password, name) => {
  return (dispatch) => {
    let userEmail = null,
      loggedIn = false;

    firebaseAuth
      .createUserWithEmailAndPassword(email, password, name)
      .then((result) => {
        firebaseAuth.onAuthStateChanged((user) => {
          console.log("user", user);
          result.user.updateProfile({
            displayName: name,
          });
          if (user) {
            userEmail = user.email;
            let userName = user.displayName;
            loggedIn = true;
            dispatch({
              type: "SIGNUP_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
                isSignedIn: loggedIn,
              },
            });
            dispatch({
              type: "LOGIN_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
              },
            });
          }
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};
