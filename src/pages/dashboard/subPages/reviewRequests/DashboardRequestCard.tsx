import {
    NewUserRequest,
    ScopeRequest,
  } from "../../../../store/reducers/dashboard/reviewRequests/types";
  import { useDispatch } from "react-redux";
  import { useRealmApp } from "../../../../realm/RealmApp";
  import { useBoundingClient } from "../../../../hooks/use-bounding-client-rect";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
  import { useLayoutEffect, useState } from "react";
  const DashboardRequestCard = ({
    data,
    generalInfoArr
  }: {
    data: NewUserRequest | ScopeRequest;
    generalInfoArr: {key: string, content: string}[]
  }) => {
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
        useLayoutEffect(() => {
          paragraphContainerSet();
          paragraphSet();
        }, []);
        const [expandPurpose, setExpandPurpose] = useState(false);
        const pBottom = paragraphBox?.bottom;
        const pConatinerBottom = paragraphContainerBox?.bottom;
        const pTop = paragraphBox?.top;
        const pContainerTop = paragraphContainerBox?.top;
        const pHeight = paragraphBox?.height;
        const headerHeight = pTop && pContainerTop ? pTop - pContainerTop : 0;
        const expandedPurposeHeight = pHeight ? headerHeight + pHeight : headerHeight;
        const isOverflowing =
          pBottom && pConatinerBottom ? pBottom - pConatinerBottom > 0 : true;
    return (
      <div className="dashboard-request-card-container">
        <h2 className="dashboard-request-card-header">Request Id: {data._id}</h2>
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
                  ? { height: `calc(4rem + ${expandedPurposeHeight}px)` }
                  : {}
              }
            >
              <h3>Purpose</h3>
              <p ref={paragraphRef}>{data.purpose}</p>
              {(isOverflowing || expandPurpose) && (
                <div
                  className={`purpose-expand-btn ${
                    !expandPurpose ? "hidden" : ""
                  }`}
                >
                  <button onClick={() => setExpandPurpose((state) => !state)}>
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
            <div className="dashboard-request-creation-date">
              Created on{" "}
              {new Date(data.creation_date).toLocaleDateString("en-us", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default DashboardRequestCard