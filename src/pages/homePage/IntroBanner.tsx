import { Link } from "react-scroll";
import { useEffect, useState, useRef } from "react";
import ActionCard from "../utilityComponents/actionCard/ActionCard";
import {
  faChevronDown,
  faPeopleGroup,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  enableBodyScroll,
  disableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useScrollListener from "../../hooks/use-scroll-listener";
import useScrollPos from "../../hooks/use-scroll-pos";
const staticDomain = process.env.REACT_APP_STATIC_FILES_DOMAIN;
const WelcomeHeader = ({ namespace }: { namespace: string }) => {
  const [mounted, setMounted] = useState(false);
  //will not run animations until mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
      <div className={`${namespace}-banner-header ${mounted ? "mounted" : ""}`}>
        <h1>WELCOME TO WAR</h1>
        <h1>CHRONICLE</h1>
      </div>
  );
};
const WelcomeSummary = ({ namespace }: { namespace: string }) => {
  return (
    <p className={`${namespace}-banner-summary`}>
      War Chronicle is an interactive archive, which captures Russia’s War of
      Aggression in Ukraine since February 24th, 2022. The archive is meant to
      offer a look at the multifaceted changes to global and regional politics,
      culture, and economics. This archive of Russian Aggression is a
      collaborative effort between Columbia University’s Harriman Institute, its
      various students and alumni, and volunteers from around the world.
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
  const introBannerEl = useRef<HTMLDivElement>(null);
  const windowTop = useScrollPos({ yScrollPos: 5 });
  const { yScrollEnd } = useScrollListener(introBannerEl);

  useEffect(() => {
    if (!yScrollEnd && !windowTop) disableBodyScroll(document.body);
    else enableBodyScroll(document.body);
    return () => clearAllBodyScrollLocks();
  }, [yScrollEnd, windowTop]);
  return (
    <>
      <div className={`${namespace}-intro-banner`}>
        <img
          src={`https://${staticDomain}/home-pg/soliders-carrying-arms.jpg`}
          alt="Soldiers carrying arms"
        />
        <WelcomeHeader namespace={namespace} />
        <div ref={introBannerEl} className={`${namespace}-banner-content`}>
          <div className={`${namespace}-banner-transition-container`}>
            <WelcomeSummary namespace={namespace} />
            <WelcomeActions namespace={namespace} />
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
    </>
  );
};
export default IntroBanner;
