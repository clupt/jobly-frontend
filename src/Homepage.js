import { Link } from "react-router-dom";
import {useContext} from "react";
import userContext from "./userContext";
import "./Homepage.css"

/** Homepage:
*     homepage visual element
*
*
* RoutesList --> Homepage
*/

function Homepage() {
  const { username } = useContext(userContext);

  const loggedInHomepageContent =
    <div className="Homepage-loggedInHomepageContent">
      <p>Welcome back, {username}!</p>
    </div>;
  const loggedOutHomepageContent =
    <div className="Homepage-loggedOutHomepageContent">
      <Link to="/login">
        <button className="Homepage-login-btn">Log in</button>
      </Link>
      <Link to="/signup">
        <button className="Homepage-signup-btn">Sign up</button>
      </Link>
    </div>;

  return (
    <div className="Homepage">
      <h1 className="Homepage-title">Jobly</h1>
      <h3 className="Homepage-description">
        All the jobs in one, convenient place.
      </h3>
      {username ? loggedInHomepageContent : loggedOutHomepageContent}
    </div>

  );
}

export default Homepage;
