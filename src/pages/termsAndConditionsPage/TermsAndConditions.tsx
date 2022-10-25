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
const TermsAndConditions = () => {
  return (
    <div>
      <div>
        <div>
          <FontAwesomeIcon icon={faFileContract} />
          <h1>Terms and Conditions</h1>
        </div>
        <p></p>
      </div>
      <PolicyBody id={"cookie-policy"} heading={"Cookie Policy"}></PolicyBody>
      <PolicyBody id={"privacy-policy"} heading={"Privacy Policy"}></PolicyBody>
    </div>
  );
};
export default TermsAndConditions;
