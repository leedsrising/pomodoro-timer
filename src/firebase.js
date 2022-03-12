// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, connectDatabaseEmulator, ref, set, get, child } from "firebase/database";

import date from 'date-and-time';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXyX405oPwh2DIFcE9uMmH21NHBNuWpLs",
  authDomain: "timer-app-42a9d.firebaseapp.com",
  projectId: "timer-app-42a9d",
  storageBucket: "timer-app-42a9d.appspot.com",
  messagingSenderId: "564978201986",
  appId: "1:564978201986:web:9632fd72eda3e2d409cb9b",
  measurementId: "G-HQYJSPPQ2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase();
connectDatabaseEmulator(db, "localhost", 9000);

// export function writeUserData(userId, name, email, imageUrl) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId), {
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }

export function writeUserSessionComplete(userId) {
    const db = getDatabase();
    const now = new Date();
    date.format(now, 'YYYY/MM/DD HH:mm:ss');

    set(ref(db, 'users/' + userId), {
        completed: now,
    });
}

export function readUser(userId) {
    console.log("1")
    const db = getDatabase();
    get(child(db, `users/${userId}`)).then((snapshot) => {
        console.log("2")
        if (snapshot.exists()) {
        console.log(snapshot.val());
        } else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}