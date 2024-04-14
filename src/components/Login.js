import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch  = useDispatch();

  const [isSignInForm, setIsSigninForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const toggleSigninForm = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setIsSigninForm(!isSignInForm);
    
    setErrorMessage("");

  };

  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(emailRef.current.value,passwordRef.current.value);
    setErrorMessage(message);
    if(message) return;

      if (!isSignInForm) {
          //Signup form
          createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
          )
            .then((userCredential) => {
              // Signed up
              const user = userCredential.user;
              console.log("user",user);
              updateProfile(user, {
                displayName: nameRef.current.value, photoURL: "https://avatars.githubusercontent.com/u/52398513?v=4"
              }).then(() => {
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName , photoURL: photoURL}));
                // Profile updated!
                navigate("/browse");
              }).catch((error) => {
                // An error occurred
                setErrorMessage(error.message)
              });
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
                setErrorMessage(errorCode+" - "+errorMessage)
            });
      } else {
          //SignIn form
          signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
              .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  console.log("signIn user",user);
                  navigate("/browse");
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setErrorMessage(errorCode + " - "+errorMessage);
              });
      }

  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg"
          alt="logo"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="w-3/12 absolute p-12 text-white bg-black my-36 mx-auto left-0 right-0 bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        
        {!isSignInForm && <input
        ref = {nameRef}
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-700 "
        />}
        <input
        ref={emailRef}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 "
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 "
        />
        <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
        <button className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
          {isSignInForm ?  "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSigninForm}>
         { isSignInForm ? "New to Netflix ? Sign Up now " : "Already have an account ? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
