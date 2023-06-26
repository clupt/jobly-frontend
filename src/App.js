import './App.css';
import { BrowserRouter } from "react-router-dom";
import Navigation from './Navigation';
import RoutesList from './RoutesList';
import JoblyApi from './api';
import { useState, useEffect } from 'react';
import userContext from "./userContext";
import { decodeToken } from "react-jwt";

/**
 *
 * App:
 *  Controls Jobly website
 *  Handles login and sign up validation
 *
 * state:
 *    token - null or user's JWT
 *    currUserData - {username,
 *                    firstName,
 *                    lastName,
 *                    email,
 *                    isAdmin (t/f),
 *                    applications ([])
 *                  }
 *     errorMessages - ["Invalid username/password", ...]
 *
 * props: none
 *
 * App ==> { Navigation, RoutesList }
 */
function App() {

  const initialState = {
    username: null,
    firstName: null,
    lastName: null,
    isAdmin: null,
    applications: null
  };
  const tokenFromLocalStorageOrNull = localStorage.getItem("token") || null;

  const [token, setToken] = useState(tokenFromLocalStorageOrNull);
  const [currUserData, setCurrUserData] = useState(initialState);
  const [errorMessages, setErrorMessages] = useState(null);


  /** Gets user data on initial render and token change */
  useEffect(function fetchUserOnTokenChange() {
    async function getUser() {
      if (token !== null) {
        JoblyApi.token = token;
        const username = decodeToken(token).username;
        try {
          const userResult = await JoblyApi.getUser(username, token);
          setCurrUserData(userResult);
        } catch (error) {
          setErrorMessages(error);
        }
      }
    }
    getUser();
  }, [token]);

  /** Logs in a user or sets error messages */
  async function login(loginData) {
    const { username, password } = loginData;
    try {
      const token = await JoblyApi.loginUser({ username, password });
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      return error;
    }
  }

  /** Signs up a user or sets error messages */
  async function signup(signupData) {
    const { username, password, firstName, lastName, email } = signupData;
    try {
      const token =
        await JoblyApi.registerUser(
          { username, password, firstName, lastName, email }
        );
      setToken(token);
      JoblyApi.token = token;
      localStorage.setItem("token", token);
    } catch (error) {
      setErrorMessages(error);
    }
  }

  /** Logs out a user and sets token to empty string */
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    setCurrUserData(initialState);
  }
  return (
    <div className="App">
      <userContext.Provider value={
        {
          username: currUserData.username,
          firstName: currUserData.firstName,
          applications: currUserData.applications
        }
      }>
        <BrowserRouter>
          <Navigation logout={logout} />
          <RoutesList
            login={login}
            signup={signup}
            logout={logout}
            errorMessages={errorMessages}
          />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
