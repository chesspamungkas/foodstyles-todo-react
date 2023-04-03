import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Login from "./components/Login";
import Signup from "./components/Signup";
import Todos from "./components/Todos";

import { logout } from "./slices/auth";

import EventBus from "./common/EventBus";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <Router>
      <div style={{height: "88vh"}}>
        <nav className="navbar navbar-expand justify-content-end">
          {currentUser ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/todos"} className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </ul>
          ) : 
          ''
          }
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />        
            <Route path="/todos" element={<Todos />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    </Router>
  );
};

export default App;