import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useWindowWidth from "../../../hooks/use-window-width";
import Copyright from "./CopyRight";
import footerData from "./formData";
interface LinkProps {
  route: string;
  textContent?: string;
  externalLink: boolean;
}
interface FooterColumnProps {
  links: LinkProps[];
  heading: string;
}
const FooterColumn = ({ data }: { data: FooterColumnProps }): JSX.Element => {
  return (
    <div className="footer-column-container">
      <h2>{data.heading}</h2>
      <div className="footer-column-link-container">
        {data.links.map((linkData) => {
          let link;
          if (linkData.externalLink)
            link = (
              <a key={linkData.textContent} href={linkData.route}>
                {linkData.textContent}
              </a>
            );
          else
            link = (
              <Link key={linkData.textContent} to={linkData.route}>
                {linkData.textContent}
              </Link>
            );
          return link;
        })}
      </div>
    </div>
  );
};
interface FooterContactRowProps {
  textContent: string;
  icon: IconProp;
  children: JSX.Element;
}
const FooterContactRow = ({
  textContent,
  icon,
  children,
}: FooterContactRowProps): JSX.Element => {
  return (
    <div className="footer-contact-row">
      <FontAwesomeIcon icon={icon} />
      <div className="footer-contact-row-text">
        <span>{textContent}</span>
        {children}
      </div>
    </div>
  );
};
const Footer = (): JSX.Element => {
  const mediumWidth = useWindowWidth(992);
  const location = process.env.REACT_APP_OFFICE_LOCATION;
  const locationURI = encodeURI(location ? location : "");
  const locationURL = `https://www.google.com/maps/search/?api=1&query=${locationURI}`;
  return (
    <footer id="footer">
      <div id="footer-container">
        <div className="footer-columns-container">
          {footerData.map((column) => (
            <FooterColumn key={column.heading} data={column} />
          ))}
        </div>
        <div className="footer-contact-column">
          <FooterContactRow textContent="Location:" icon={faLocationDot}>
            <a href={locationURL} target={'_blank'} rel="noreferrer noopener">{location}</a>
          </FooterContactRow>
          <FooterContactRow textContent="Contact Us: " icon={faEnvelope}>
            <a href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}>
              {process.env.REACT_APP_SUPPORT_EMAIL}
            </a>
          </FooterContactRow>
        </div>
      </div>
      <Copyright mediumWidth={mediumWidth} />
    </footer>
  );
};
export default Footer;
