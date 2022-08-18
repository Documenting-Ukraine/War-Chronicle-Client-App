import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import ActionCard from "../utilityComponents/actionCard/ActionCard";
import {
  faChevronDown,
  faPeopleGroup,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import useScrollPos from "../../hooks/use-scroll-pos";
import Navbar from "../utilityComponents/navbar/Navbar";
import useWindowResize from "../../hooks/use-window-resize";
const staticDomain = process.env.REACT_APP_STATIC_FILES_DOMAIN;
function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
const WelcomeHeader = ({ namespace }: { namespace: string }) => {
  const [mounted, setMounted] = useState(false);
  //will not run animations until mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className={`${namespace}-banner-header ${mounted ? "mounted" : ""}`}>
      <h1>WELCOME TO WAR</h1>
      <h1>CHRONICLES</h1>
    </div>
  );
};
const WelcomeSummary = ({ namespace }: { namespace: string }) => {
  return (
    <p className={`${namespace}-banner-summary`}>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
      roots in a piece of classical Latin literature from 45 BC, making it over
      2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
      College in Virginia, looked up one of the more obscure Latin words
    </p>
  );
};
const WelcomeActions = ({ namespace }: { namespace: string }) => {
  return (
    <div className={`${namespace}-banner-action-cards`}>
      <ActionCard
        icon={faSearch}
        header="Search Archive"
        type="link"
        description="View and search the war archive. Updated daily with verified content."
      />
      <ActionCard
        icon={faPeopleGroup}
        header="Become a Contributor"
        type="link"
        description="Interested in documenting the war? Join our team via application submission"
      />
    </div>
  );
};
const IntroBanner = ({ namespace }: { namespace: string }) => {
  const windowHeight = useWindowResize();
  // const scrollPos = useScrollPos({
  //   yScrollPos: windowHeight[1] * 0.2 + convertRemToPixels(3.5),
  // });
  // const startScroll = useScrollPos({ yScrollPos: windowHeight[1] * 0.1 });
  // const [textActive, setTextActive] = useState(!scrollPos);
  // console.log(startScroll);
  return (
    <>
      <div className={`${namespace}-intro-banner-space`}>
        <div
          // style={{
          //   position: !scrollPos ? "fixed" : "absolute",
          //   top: !scrollPos ? 0 : "unset",
          //   bottom: !scrollPos ? "unset" : 0,
          // }}
          className={`${namespace}-intro-banner-container`}
        >
          <Navbar />
          <div className={`${namespace}-intro-banner`}>
            <img
              src={`https://${staticDomain}/home-pg/soliders-carrying-arms.jpg`}
              alt="Soldiers carrying arms"
            />
            <div className={`${namespace}-banner-content`}>
              <WelcomeHeader namespace={namespace} />
              <div className={`${namespace}-banner-transition-container`}>
                <WelcomeSummary namespace={namespace} />
                <WelcomeActions namespace={namespace} />
              </div>
              <Link
                className={`${namespace}-banner-continue-tab`}
                to={`${namespace}-recent-submissions`}
                smooth={true}
                duration={500}
              >
                <span>Recent Submissions</span>
                <FontAwesomeIcon icon={faChevronDown} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IntroBanner;
