import {
  NewUserRequest,
  ScopeRequest,
} from "../../../../store/reducers/dashboard/reviewRequests/types";
import { useDispatch } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import { useBoundingClient } from "../../../../hooks/use-bounding-client-rect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useState, useRef, useEffect } from "react";
import useWindowWidth from "../../../../hooks/use-window-width";
import { unstable_batchedUpdates } from "react-dom";
const purposeTransition = 300;
const DashboardRequestCard = ({
  data,
  generalInfoArr,
}: {
  data: NewUserRequest | ScopeRequest;
  generalInfoArr: { key: string; content: string }[];
}) => {
  const mediumWindowWidth = useWindowWidth(769);
  const [expandPurpose, setExpandPurpose] = useState(false);
  const {
    box: paragraphContainerBox,
    ref: paragraphContainerRef,
    set: paragraphContainerSet,
  } = useBoundingClient();
  const {
    box: paragraphBox,
    ref: paragraphRef,
    set: paragraphSet,
  } = useBoundingClient();
  const pBottom = paragraphBox?.bottom;
  const pConatinerBottom = paragraphContainerBox?.bottom;
  const pTop = paragraphBox?.top;
  const pContainerTop = paragraphContainerBox?.top;
  const pHeight = paragraphBox?.height;
  const headerHeight = pTop && pContainerTop ? pTop - pContainerTop : 0;
  const expandedPurposeHeight = pHeight ? headerHeight + pHeight : headerHeight;
  const isOverflowing = useRef(
    pBottom && pConatinerBottom ? pBottom - pConatinerBottom > 0 : true
  );
  useEffect(() => {
    //only update if not expanded
    if (!expandPurpose)
      isOverflowing.current =
        pBottom && pConatinerBottom ? pBottom - pConatinerBottom > 0 : true;
  }, [expandPurpose, pConatinerBottom, pBottom]);
  useLayoutEffect(() => {
    unstable_batchedUpdates(() => {
      paragraphContainerSet();
      paragraphSet();
    });
  //eslint-disable-next-line
  }, [])
  return (
    <div className="dashboard-request-card-container">
      <h2 className="dashboard-request-card-header">{`Request Id: ${data._id}`}</h2>
      <div className="dashboard-request-card-body">
        <div className="dashboard-request-card-content">
          <div className="dashboard-request-card-general-info">
            {generalInfoArr.map((row) => {
              return (
                <div key={row.key} className="general-row">
                  <h3>{row.key}</h3>
                  <p>{row.content}</p>
                </div>
              );
            })}
          </div>
          <div
            ref={paragraphContainerRef}
            className={`dashboard-request-card-purpose`}
            style={
              expandPurpose
                ? {
                    height: `calc(4rem + ${expandedPurposeHeight}px)`,
                    transition: `${purposeTransition}ms all ease-out`,
                  }
                : { transition: `${purposeTransition}ms all ease-out` }
            }
          >
            <h3>Purpose</h3>
            <p ref={paragraphRef}>{data.purpose}</p>
            {(isOverflowing) && (
              <div
                className={`purpose-expand-btn ${
                  !expandPurpose ? "hidden" : ""
                }`}
              >
                <button
                  onClick={() => {
                    setExpandPurpose((state) => !state);
                  }}
                >
                  <FontAwesomeIcon
                    icon={expandPurpose ? faChevronUp : faChevronDown}
                  />
                  <span>{expandPurpose ? "Collapse" : "Expand"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="dashboard-request-card-footer">
          <div className="dashboard-request-card-action-btns">
            <button>Accept</button>
            <button>Reject</button>
          </div>
          {mediumWindowWidth && (
            <div className="dashboard-request-creation-date">
              Created on{" "}
              {new Date(data.creation_date).toLocaleDateString("en-us", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DashboardRequestCard;
