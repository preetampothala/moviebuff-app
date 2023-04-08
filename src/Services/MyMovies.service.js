import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDDterKQwdXqaIVJREc4Cfo3_HHV6yezkk",
  authDomain: "moviebuff-38aaa.firebaseapp.com",
  databaseURL: "https://moviebuff-38aaa-default-rtdb.firebaseio.com",
  projectId: "moviebuff-38aaa",
  storageBucket: "moviebuff-38aaa.appspot.com",
  messagingSenderId: "763469325400",
  appId: "1:763469325400:web:daf663b4588f89204e562d",
  measurementId: "G-H8YLVEKCM4",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function addMyWatchlists(courses = []) {
  const coursesRef = ref(db, "mywatchlists");
  return set(coursesRef, courses);
}

export async function getMyWatchlists() {
  const coursesRef = ref(db, "mywatchlists");
  return get(coursesRef);
}
