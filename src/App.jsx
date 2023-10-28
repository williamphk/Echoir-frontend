import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/layout/Navbar.jsx";
import LeftSidebar from "./components/layout/LeftSidebar.jsx";
import RightSidebar from "./components/layout/RightSidebar.jsx";
import LandingPage from "./components/auth/LandingPage.jsx";
import Register from "./components/auth/Register.jsx";
import NewsFeed from "./components/posts/NewsFeed.jsx";
import Profile from "./components/profile/Profile.jsx";
import Friends from "./components/friends/Friends.jsx";
import Setting from "./components/settings/Setting.jsx";
import Loading from "./components/common/Loading.jsx";
import Footer from "./components/layout/Footer.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import NavigationHandler from "./NavigationHandler.jsx";

import { login, checkAuth } from "./slices/authSlice.js";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && isTokenValid(token)) {
      //console.log("Token is valid");
    } else if (token && !isTokenValid(token)) {
      //console.log("Token is expired");
      localStorage.removeItem("token");
    }

    // Dispatch the login action only if there's a valid token in the localStorage and the user is not already logged in
    if (token && !isLoggedIn) {
      dispatch(login({ token, user }));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [dispatch, isLoggedIn]);

  const isTokenValid = (token) => {
    let decodedToken = jwtDecode(token);
    //console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return false;
    } else {
      //console.log("Valid token");
      return true;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        <NavigationHandler />
        {isLoggedIn && <Navbar />}
        <div
          className={`${
            isLoggedIn &&
            "min-h-screen bg-gray-100 flex justify-center lg:justify-between"
          }`}
        >
          {isLoggedIn && (
            <LeftSidebar className="flex-col bg-gray-100 w-[330px] hidden sm:flex py-3 pl-0 sm:pl-3" />
          )}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={isLoggedIn ? <NewsFeed /> : <LandingPage />}
            />
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/friends/*" element={<Friends />} />
              <Route path="/profile/:userId/friends" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
          </Routes>
          {isLoggedIn && (
            <RightSidebar className="flex-col bg-gray-100 w-[330px] hidden lg:flex py-3 pr-0 sm:pr-3 " />
          )}
        </div>
        {isLoggedIn && <Footer />}
      </Router>
    </div>
  );
}

export default App;

//Todo: like modal
