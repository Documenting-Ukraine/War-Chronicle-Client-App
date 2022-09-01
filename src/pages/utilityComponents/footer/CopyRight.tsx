import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import AppLogo from "../logo/AppLogo";
//Automates changing year
let d = new Date();
let time = d.getFullYear();

const Copyright = ({ mediumWidth }:{mediumWidth: boolean}) => {
  return (
    <div id="footer-copyright">
      <div id="footer-logo">
        <Link to="/" className="navbar-logo">
        </Link>
        {mediumWidth && <div style={{height: "2.5rem"}}><AppLogo /></div>}
      </div>
      <p>
        <FontAwesomeIcon icon={faCopyright} /> {time} War Chronicle. All rights
        reserved.
      </p>
    </div>
  );
};

export default Copyright;
