import React, { useState } from "react";
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "./firebaseConfig";

const EmailLinkAuth: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const sendLink = async () => {
    const actionCodeSettings = {
      url: "http://localhost:3000/finishSignUp",
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert("Email sent! Check your inbox.");
      window.localStorage.setItem("emailForSignIn", email);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const completeSignIn = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn") || prompt("Please provide your email:");
      if (email) {
        try {
          await signInWithEmailLink(auth, email, window.location.href);
          alert("Successfully signed in!");
          window.localStorage.removeItem("emailForSignIn");
        } catch (err: any) {
          console.error(err.message);
        }
      }
    }
  };

  return (
    <div>
      <h2>Email Link Authentication</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={sendLink}>Send Sign-In Link</button>
      <button onClick={completeSignIn}>Complete Sign-In</button>
    </div>
  );
};

export default EmailLinkAuth;