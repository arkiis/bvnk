import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { history } from "../../history";

import { config } from "../../authService/firebase/firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

let firebaseAuth = firebase.auth();

export const loginWithGoogle = () => {
  return (dispatch) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth
      .signInWithPopup(provider)
      .then(function (result) {
        let token = result.credential.accessToken,
          user = result.user.email,
          name = result.user.displayName,
          photoUrl = result.user.photoURL;
        dispatch({
          type: "LOGIN_WITH_GOOGLE",
          payload: {
            email: user,
            name: name,
            photoUrl,
            token,
            loggedInWith: "firebase",
          },
        });
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
