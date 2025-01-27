import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { dist } from 'david-ai';

// Initialize modal functionality
dist.initModal();

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Optional: Monitor authentication state
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-center">
      <button
        type="button"
        data-dui-toggle="modal"
        data-dui-target="#exampleModalForm"
        className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition"
      >
        Sign In
      </button>
      <div
        className="fixed antialiased inset-0 bg-stone-800 bg-opacity-75 flex justify-center items-center opacity-0 pointer-events-none transition-opacity duration-300 ease-out z-[9999]"
        id="exampleModalForm"
        aria-hidden="true"
      >
        <div className="bg-white rounded-lg w-9/12 sm:w-7/12 md:w-5/12 lg:w-3/12 scale-95 transition-transform duration-300 ease-out">
          <div className="pt-4 px-4 flex justify-between items-start">
            <div className="flex flex-col">
              <h1 className="text-xl text-stone-800 font-semibold">Sign In</h1>
              <p className="text-stone-500">Enter your email and password to Sign In.</p>
            </div>
            <button
              type="button"
              data-dui-dismiss="modal"
              aria-label="Close"
              className="text-stone-500 hover:text-stone-800"
            >
              &times;
            </button>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 mt-2 space-y-1.5">
                <label htmlFor="email" className="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2">
                  Email
                </label>
                <div className="relative w-full">
                  <input
                    placeholder="someone@example.com"
                    type="email"
                    className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-4 mt-2 space-y-1.5">
                <label htmlFor="password" className="font-sans text-sm text-stone-800 dark:text-white font-semibold mb-2">
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    placeholder="*******"
                    type="password"
                    className="w-full aria-disabled:cursor-not-allowed outline-none focus:outline-none text-stone-800 dark:text-white placeholder:text-stone-600/60 ring-transparent border border-stone-200 transition-all ease-in disabled:opacity-50 disabled:pointer-events-none select-none text-sm py-2 px-2.5 ring shadow-sm bg-white rounded-lg duration-100 hover:border-stone-300 hover:ring-none focus:border-stone-400 focus:ring-none peer"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="inline-flex items-center mt-1">
                <label className="flex items-center cursor-pointer relative" htmlFor="modal-sign-in">
                  <input
                    type="checkbox"
                    checked
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow-sm hover:shadow border border-stone-200 checked:bg-stone-800 checked:border-stone-800"
                    id="modal-sign-in"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg stroke-width="1.5" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
                      <path d="M5 13L9 17L19 7" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </span>
                </label>
                <label className="cursor-pointer ml-2 text-stone-800 text-sm" htmlFor="modal-sign-in">
                  Remember Me
                </label>
              </div>
              <div className="px-4 pb-4 flex flex-col justify-end gap-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Sign In"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
                <small className="font-sans text-sm mb-2 mt-3 flex items-center justify-center gap-1 text-stone-500">
                  Don't have an account?{" "}
                  <a href="#" onClick={(e) => e.preventDefault()} className="font-sans text-sm text-primary font-semibold">
                    Sign up
                  </a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;