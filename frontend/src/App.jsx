import { Routes, Route, Navigate } from "react-router";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import OnboardingPage from "./Pages/OnboardingPage";
import Callpage from "./Pages/Callpage";
import ChatPage from "./Pages/ChatPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

const App = () => {
  const { data:authData, isLoading ,error } = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
  });
  const authUser=authData?.user
  return (
    <div className="h-screen " data-theme="night">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage /> :<Navigate to="/"/>} />
        <Route path="/onboarding" element={authUser ?<OnboardingPage /> : <Navigate to="/"/>} />
        <Route path="/notification" element={authUser ? <Notification /> :<Navigate to="/"/>} />
        <Route path="/call" element={authUser?<Callpage />:<Navigate to="/"/>} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/"/>} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
