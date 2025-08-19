import React, { useState } from "react";
import { ShipWheel } from "lucide-react";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", signUpData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        
        {/* SIGNUP FORM -- LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheel className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">We Meet</span>
          </div>

          {/* FORM */}
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={signUpData.fullName}
              onChange={(e) =>
                setSignUpData({ ...signUpData, fullName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
