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
export const createUser = async (user) => {
  const userRef = ref(db, `users/${user.userId}`);
  return set(userRef, user);
};
export const fetchUser = async (userId) => {
  const userRef = ref(db, `users/${userId}`);
  return get(userRef);
};
export const writeToken = async (token) => {
  localStorage.setItem("token", token);
};
export const readToken = async () => {
  return localStorage.getItem("token");
};
export const writeUserId = async (userId) => {
  localStorage.setItem("userId", userId);
};
export const readUserId = async () => {
  return localStorage.getItem("userId");
};
export const removeUserId = async () => {
  localStorage.removeItem("userId");
};

export const removeToken = async () => {
  localStorage.removeItem("token");
};
