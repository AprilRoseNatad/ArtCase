import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../config/firebase";


export function register(
  email:string,
  password:string
){
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}


export function login(
  email:string,
  password:string
){
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}