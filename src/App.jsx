import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./components/custom/Header";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);
  const { user, isloaded, isSignedIn } = useUser();

  // if (!isloaded) {
  //   return <div>Loading...</div>;
  // }

  if (!isSignedIn && isloaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
