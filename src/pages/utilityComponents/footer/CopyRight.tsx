import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
//Automates changing year
let d = new Date();
let time = d.getFullYear();

const Copyright = ({ mediumWidth }:{mediumWidth: boolean}) => {
  return (
    <div id="footer-copyright">
      <div id="footer-logo">
        <Link to="/" className="navbar-logo">
        </Link>
        {mediumWidth && (
          <Link to="/" className="nav-brand">
            brand
          </Link>
        )}
      </div>
      <p>
        <FontAwesomeIcon icon={faCopyright} /> {time} Brand. All rights
        reserved.
      </p>
    </div>
  );
};

export default Copyright;
