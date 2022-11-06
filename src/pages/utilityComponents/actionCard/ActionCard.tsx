import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export const ActionCard = ({
  header,
  description,
  icon,
  onClick,
  linkRoute,
  type,
}: {
  header: string;
  description?: string;
  icon?: IconProp;
  type: "btn" | "link" | "none";
  onClick?: () => void;
  linkRoute?: string;
}) => {
  const navigate = useNavigate();
  const content = (
    <>
      <div className="action-card-header">
        {icon && <FontAwesomeIcon icon={icon} />}
        <h2>{header}</h2>
      </div>
      {description && <p className="action-card-description">{description}</p>}
    </>
  );
  return (
    <>
      {type === "btn" && (
        <button className="action-card" onClick={onClick}>
          {content}
        </button>
      )}
      {type === "link" && (
        <Link
          to={linkRoute ? linkRoute : ""}
          className="action-card"
          onClick={(e) => {
            if (onClick) onClick();
          }}
        >
          {content}
        </Link>
      )}
      {type === "none" && content}
    </>
  );
};
export default ActionCard;
