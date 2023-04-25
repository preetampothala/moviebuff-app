//fetch token from firebase auth

import { redirect } from "react-router-dom";
import { readToken, readUserId } from "../Services/Auth.service";

export async function getAuthToken() {
  //read from local storage
  try {
    const token = await readToken();
    return token;
  } catch (err) {
    console.log(err);
  }
}
export async function getUserId() {
  try {
    const userId = await readUserId();
    return userId;
  } catch (err) {
    console.log(err);
  }
}

export async function tokenLoader() {
  return await getAuthToken();
}

export async function checkAuthLoader() {
  const token = await getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}
