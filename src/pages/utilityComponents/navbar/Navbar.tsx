import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useWindowWidth from "../../../hooks/use-window-width";
import { useRealmApp } from "../../../realm/RealmApp";
import UserDropdown from "../userDropdown/UserDropdown";
const staticDomain = process.env.REACT_APP_STATIC_FILES_DOMAIN;
const Navbar = (): JSX.Element => {
  const app = useRealmApp();
  const navigate = useNavigate();
  const smallWindowWidth = useWindowWidth(769);
  const [dropdown, setDropdown] = useState(false);
  const customData = app.currentUser?.customData;
  const firstName = customData?.last_name;
  const lastName = customData?.first_name;
  let userName;
  if (!firstName || !lastName) userName = undefined;
  else userName = firstName + " " + lastName;
  const email = app.currentUser?.customData?.email;
  const logUserOut = async () => {
    await app.logOut();
    navigate("/forms/login");
  };
  return (
    <nav id="navbar">
      <div id="navbar-logo">
        <Link to="/"><img src = {`https://${staticDomain}/logo/war-chronicle-logo.png`} alt={"War Chronicle Logo"}/></Link>
      </div>
      {!smallWindowWidth && app.currentUser && (
        <UserDropdown
          currentUser={app.currentUser}
          logOut={logUserOut}
          name={typeof userName === "string" ? userName : undefined}
          email={typeof email === "string" ? email : undefined}
        />
      )}
      {!smallWindowWidth && (
        <button
          id="navbar-toggler-btn"
          onClick={() => setDropdown((state) => !state)}
          aria-label={"toggle navigation dropdown menu"}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
      <div
        className={`navbar-links-container ${
          !smallWindowWidth && dropdown ? "show" : ""
        }`}
      >
        <div className="navbar-links">
          <Link to={"/categories"}>Categories</Link>
          <Link to={"/search"}>Search</Link>
          <Link to={"/about"}>About</Link>
        </div>
        {smallWindowWidth && <div className="nav-link-divider"></div>}

        {app.currentUser && smallWindowWidth ? (
          <UserDropdown
            currentUser={app.currentUser}
            logOut={logUserOut}
            name={typeof userName === "string" ? userName : undefined}
            email={typeof email === "string" ? email : undefined}
          />
        ) : !app.currentUser ? (
          <Link className="auth-link" to={"/forms/login"}>
            Login
          </Link>
        ) : null}
      </div>
    </nav>
  );
};
export default Navbar;
