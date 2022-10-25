import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const namespace = "terms-and-conditions";
const PolicyBody = ({
  children,
  id,
  heading,
}: {
  children?: string | JSX.Element;
  id: string;
  heading: string;
}) => {
  return (
    <div id={id}>
      <h2>{heading}</h2>
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  );
};
const TermsContainer = ({ children }: { children?: string | JSX.Element }) => {
  return (
    <div id={`${namespace}-terms-container`}>
      <div id={`${namespace}-terms-header`}>
        <FontAwesomeIcon icon={faFileContract} />
        <h1>Terms and Conditions</h1>
      </div>
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  );
};
const TermsAndConditions = () => {
  return (
    <div id={`${namespace}-pg`}>
      <div id={`${namespace}-pg-container`}>
        <TermsContainer></TermsContainer>
        <PolicyBody id={"cookie-policy"} heading={"Cookie Policy"}></PolicyBody>
        <PolicyBody
          id={"privacy-policy"}
          heading={"Privacy Policy"}
        ></PolicyBody>
      </div>
    </div>
  );
};
export default TermsAndConditions;
