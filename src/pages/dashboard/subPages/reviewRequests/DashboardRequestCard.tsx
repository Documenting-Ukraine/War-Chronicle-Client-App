import {
  isNewUserRequest,
  NewUserRequest,
  ScopeRequest,
} from "../../../../store/reducers/dashboard/reviewRequests/types";
import { useDispatch } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import { useBoundingClient } from "../../../../hooks/use-bounding-client-rect";
import {
  deleteScopeRequest,
  deleteNewUserRequest,
} from "../../../../store/reducers/dashboard/dashboardReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useState, useEffect } from "react";
import useWindowWidth from "../../../../hooks/use-window-width";
import { unstable_batchedUpdates } from "react-dom";
import LoadingIcon from "../../../utilityComponents/loadingIcon/LoadingIcon";
const purposeTransition = 300;
const DashboardRequestCard = ({
  data,
  generalInfoArr,
  idx,
  lastId,
}: {
  data: NewUserRequest | ScopeRequest;
  generalInfoArr: { key: string; content: string }[];
  idx: number;
  lastId: string;
}) => {
  const mediumWindowWidth = useWindowWidth(769);
  const [expandPurpose, setExpandPurpose] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const app = useRealmApp();
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
  const overflow =
    pBottom && pConatinerBottom ? pBottom - pConatinerBottom > 0 : true;
  const [isOverflowing, setOverflow] = useState(overflow);
  useLayoutEffect(() => {
    paragraphContainerSet();
    paragraphSet();
    unstable_batchedUpdates(() => {
      setExpandPurpose(false);
      setOverflow(overflow);
    });
    //eslint-disable-next-line
  }, [data]);
  useEffect(() => {
    //only update if not expanded
    if (!expandPurpose) {
      setTimeout(() => {
        const pContainer = paragraphContainerSet();
        const p = paragraphSet();
        const overflow =
          p?.bottom && pContainer?.bottom
            ? p?.bottom - pContainer?.bottom > 0
            : true;
        setOverflow(overflow);
      }, purposeTransition + 50);
    }
    //eslint-disable-next-line
  }, [expandPurpose, overflow]);
  const requestParams = {
    app: app,
    input: {
      user_request_id: data._id.toString(),
      accepted: true,
      last_el_id: lastId,
    },
  };
  const onAcceptRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isNewUserRequest(data)) {
      setIsLoading(true)
      dispatch(
        deleteNewUserRequest({
          ...requestParams,
          input: {
            ...requestParams.input,
            accepted: true,
            user_review_list_idx: idx,
          },
        })
      );
    } else {
      setIsLoading(true)
      dispatch(        
        deleteScopeRequest({
          ...requestParams,
          input: {
            ...requestParams.input,
            accepted: true,
            scope_review_list_idx: idx,
          },
        })
      );
    }
  };
  const onRejectRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isNewUserRequest(data)) {
      setIsLoading(true)
      dispatch(
        deleteNewUserRequest({
          ...requestParams,
          input: {
            ...requestParams.input,
            accepted: false,
            user_review_list_idx: idx,
          },
        })
      );
    } else {
      setIsLoading(true)
      dispatch(
        deleteScopeRequest({
          ...requestParams,
          input: {
            ...requestParams.input,
            accepted: false,
            scope_review_list_idx: idx,
          },
        })
      );
    }
  };
  return (
    <div className="dashboard-request-card-container">
      {isLoading && <div className= "dashboard-request-card-loading"><LoadingIcon strokeWidth={"0.2rem"}/></div>}
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
          <div className="dashboard-request-card-purpose-container">
            <div
              ref={paragraphContainerRef}
              className={`dashboard-request-card-purpose`}
              style={
                expandPurpose
                  ? {
                      maxHeight: `calc(4.5rem + ${expandedPurposeHeight}px)`,
                      transition: `${purposeTransition}ms all ease-out`,
                    }
                  : {
                      transition: `${purposeTransition}ms all ease-out`,
                    }
              }
            >
              <h3>Purpose</h3>
              <p ref={paragraphRef}>{data.purpose}</p>
            </div>
            {isOverflowing && (
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
            <button
              onClick={onAcceptRequest}
              aria-label="accept-request"
              disabled={isLoading}
            >
              Accept
            </button>
            <button
              onClick={onRejectRequest}
              aria-label="reject-request"
              disabled={isLoading}
            >
              Reject
            </button>
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
