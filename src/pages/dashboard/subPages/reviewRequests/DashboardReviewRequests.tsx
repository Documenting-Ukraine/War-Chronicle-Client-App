import { useRealmApp } from "../../../../realm/RealmApp";
import { Link } from "react-router-dom";
import {
  faCheckCircle,
  faFaceSmile,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import PaginationNav from "../../utilities/paginationNav/PaginationNav";
import DashboardRequestCard from "./DashboardRequestCard";
import React, { useState, memo, useEffect } from "react";
import {
  fetchNewUserRequest,
  fetchScopeRequest,
} from "../../../../store/reducers/dashboard/dashboardReducer";
import dashboardNewUserRequest from "./DashboardNewUserRequest";
import { useParams } from "react-router";

import {
  isNewUserRequest,
  isScopeRequest,
} from "../../../../store/reducers/dashboard/reviewRequests/types";
import dashboardScopeRequest from "./DashboardScopeRequest";
import LoadingIcon from "../../../utilityComponents/loadingIcon/LoadingIcon";
import PageWrapper from "../../../utilityComponents/pageWrapper/PageWrapper";

const DashboardReviewRequests = ({
  pageType,
}: {
  pageType: "review-users" | "review-scopes";
}) => {
  const reviewUsers = useSelector(
    (state: RootState) => state.dashboard.reviewNewUserRequests
  );
  const reviewScopes = useSelector(
    (state: RootState) => state.dashboard.reviewScopeRequests
  );
  const routeParams = useParams();
  const dispatch = useDispatch();

  const app = useRealmApp();
  const [listPage, setListPage] = useState(0);
  const isUsers = pageType === "review-users";
  //on mount
  useEffect(() => {
    if (isUsers) {
      dispatch(
        fetchNewUserRequest({
          app: app,
          input: {
            idx_counter: 0,
          },
        })
      );
    } else {
      dispatch(
        fetchScopeRequest({
          app: app,
          input: {
            idx_counter: 0,
          },
        })
      );
    }
  }, [dispatch, app, isUsers]);
  const list = isUsers ? reviewUsers.data : reviewScopes.data;
  const listInterval = 5;
  const listStart = listPage * listInterval;
  const listEnd = (listPage + 1) * listInterval;
  const listStatus = isUsers ? reviewUsers.status : reviewScopes.status;
  const paginationEnd = isUsers
    ? reviewUsers.pagination_end
    : reviewScopes.pagination_end;
  const onPagination = (
    e: React.MouseEvent<HTMLButtonElement>,
    asyncDispatch: () => void
  ) => {
    if (listStatus === "loading") return;
    const data = e.currentTarget.dataset;
    switch (data.actionType) {
      case "prev-pg":
        setListPage((state) => (state - 1 >= 0 ? state - 1 : 0));
        break;
      case "next-pg":
        setListPage((state) =>
          listStatus && list && list.length <= listEnd ? state : state + 1
        );
        if (!paginationEnd && list && list.length === listEnd) asyncDispatch();
        break;
      default:
        break;
    }
  };
  const onUsersPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    const asyncAction = () => {
      dispatch(
        fetchNewUserRequest({
          app: app,
          input: {
            idx_counter: reviewUsers.idx_counter,
          },
        })
      );
    };
    return onPagination(e, asyncAction);
  };
  const onScopesPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
    const asyncAction = () => {
      dispatch(
        fetchScopeRequest({
          app: app,
          input: {
            idx_counter: reviewScopes.idx_counter,
          },
        })
      );
    };
    return onPagination(e, asyncAction);
  };

  return (
    // <div id="dashboard-review-requests">
    //   <div id="dashboard-review-requests-inner">
    //     <div id="dashboard-review-requests-header">
    //       <div id="dashboard-review-requests-title">
    //         <FontAwesomeIcon icon={faCheckCircle} />
    //         <h1>Review Requests</h1>
    //       </div>
    <PageWrapper
      heading="Review Requests"
      icon={<FontAwesomeIcon icon={faCheckCircle} />}
    >
      <>
        <PaginationNav
          list={list}
          listStatus={listStatus}
          listStart={listStart}
          listEnd={listEnd}
          listPage={listPage}
          listInterval={listInterval}
          paginationEnd={paginationEnd}
          onPagination={isUsers ? onUsersPagination : onScopesPagination}
        >
          <>
            <Link
              to={`/dashboard/${routeParams.id}/manage/review-requests/new-users`}
              className={`dashboard-review-requests-types ${
                isUsers ? "selected" : ""
              }`}
              onClick={() => {
                if (!isUsers) setListPage(0);
              }}
            >
              New Users
            </Link>
            <Link
              to={`/dashboard/${routeParams.id}/manage/review-requests/new-scopes`}
              onClick={() => {
                if (isUsers) setListPage(0);
              }}
              className={`dashboard-review-requests-types ${
                isUsers ? "" : "selected"
              }`}
            >
              New Scopes
            </Link>
          </>
        </PaginationNav>
        <div className="dashboard-review-requests-list">
          {listStatus === "failed" && <div></div>}
          {listStatus === "loading" && (
            <div
              className="d-flex justify-content-center"
              style={{ position: "absolute", width: "100%" }}
            >
              <LoadingIcon strokeWidth={"0.2rem"} />
            </div>
          )}
          {listStatus !== "loading" && (!list || list.length <= 0) && (
            <div className="dashboard-review-requests-placeholder">
              <div>
                <FontAwesomeIcon icon={faFaceSmile} />
              </div>
              <h4>
                No {pageType === "review-users" ? "User" : "Scope"} requests
                were found
              </h4>
              <p>
                When a new {pageType === "review-users" ? "User" : "Scope"}{" "}
                request is made, they will appear here.
              </p>
            </div>
          )}
          {list?.slice(listStart, listEnd).map((request, index) => {
            const generalInfoArr = isNewUserRequest(request)
              ? dashboardNewUserRequest(request)
              : isScopeRequest(request)
              ? dashboardScopeRequest(request)
              : null;
            if (!generalInfoArr) return null;
            else
              return (
                <DashboardRequestCard
                  key={request._id.toString()}
                  data={request}
                  generalInfoArr={generalInfoArr}
                  idx={index}
                  lastId={list[list.length - 1]._id.toString()}
                />
              );
          })}
        </div>
      </>
    </PageWrapper>

    // </div>

    //   </div>
    // </div>
  );
};
export default memo(DashboardReviewRequests);
