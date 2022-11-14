import { Link } from "react-router-dom";
import useWindowWidth from "../../../hooks/use-window-width";
const AppLogo = ({ text = false }: { text?: boolean }) => {
  const staticDomain = process.env.REACT_APP_STATIC_FILES_DOMAIN;
  const smallWindowWidth = useWindowWidth(769);
  return (
    <div className="app-logo">
      <Link to="/">
        {smallWindowWidth && !text && (
          <span>
            <div>WAR</div>
            <div>CHRONICLE</div>
          </span>
        )}
        {text && (
          <span>
            <div>WAR</div>
            <div>CHRONICLE</div>
          </span>
        )}
        <img
          src={`https://${staticDomain}/logo/war-chronicle-logo.png`}
          alt={"War Chronicle Logo"}
        />
      </Link>
    </div>
  );
};
export default AppLogo;
