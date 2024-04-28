import React, { useEffect, useState } from "react";
import UserForm from "./UserForm/UserForm";
import axios from "axios";
import AddStoryModal from "./AddStoryModal/AddStoryModal";
import {NavLink} from "react-router-dom";

const Navbar = ({ addStory }) => {


  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showStoryModal, setStoryModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("swipTorytoken") || false);
  const [userData, setUserData] = useState({ username: "" });
  const [error, setError] = useState(null);

  const handleRegister = async (userData) => {


    console.log("Registering user:", userData);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        userData
      );
      console.log(response.data);
      setShowRegisterModal(false);
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleLogin = async (userData) => {
    console.log("Logging in user:", userData);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        userData
      );
      localStorage.setItem("swipTorytoken", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userBookmarks" , response.data.userBookmarks)
      if (!!response.data.token) {
        setIsLogin(true);
        setUserData({ username: userData.username });
        // setStories(response.data.stories); 
      }
      setShowLoginModal(false);
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("swipTorytoken");
    localStorage.removeItem("userId");
    setIsLogin(false);
    setUserData({ username: "" });
  };

  setTimeout(() => {
    localStorage.removeItem("swipTorytoken");
    localStorage.removeItem("userId");
    setIsLogin(false);
    setUserData({ username: "" });
  }, 3600000 );

  const closeModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(false);
    setError(false)
    setError(null);
  };


  const handleAddStory = (storyData) => {
    addStory(storyData);
    setStoryModal(false);
  };



  return (
    <div className="navbar">
      <div className="navbarContainer">
        <NavLink to={"/"}><h1 className="logo">SwipTory</h1></NavLink>

        {/* BEFORE LOGIN BUTONS */}
        {!isLogin ? (

          <div className="btnGrp">
            <button
              className="btn login"
              onClick={() => setShowRegisterModal(true)}
            >
              Register Now
            </button>
            <button
              className="btn2 signUp"
              onClick={() => setShowLoginModal(true)}
            >
              Sign In
            </button>
          </div>
        ) : (

          <div className="btnGrp">
            {/* AFTER LOGIN DATA */}
            <NavLink to={"/bookmark"}>
            <button className="btn login">
              Bookmark
            </button>     
            </NavLink>
            <button className="btn" onClick={() => setStoryModal(true)}> Add Story</button>
            <button className="btn login" onClick={() => handleLogout()}>
              Logout
            </button>
            <div>{userData.username}</div>
          </div>
        )}
      </div>


      {showStoryModal && <AddStoryModal closeModal={() => setStoryModal(false)} addStory={addStory} username={userData.username} />}
      {showRegisterModal && (
        <UserForm
          title="Register User"
          submitHandler={handleRegister}
          closeModal={() => setShowRegisterModal(false)}
          error={error}
        />
      )}
      {showLoginModal && (
        <UserForm
          title="Login"
          submitHandler={handleLogin}
          closeModal={() => setShowLoginModal(false)}
          error={error}
        />
      )}
    </div>
  );
};

export default Navbar;
