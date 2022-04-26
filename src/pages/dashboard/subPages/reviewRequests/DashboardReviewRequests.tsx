import { useRealmApp } from "../../../../realm/RealmApp";
import { Link } from "react-router-dom";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import PaginationNav from "../../utilities/paginationNav/PaginationNav";
import DashboardScopeRequest from "./DashboardScopeRequest";
import DashboardNewUserRequest from "./DashboardNewUserRequest";
import React, { useState } from "react";
import {
  fetchNewUserRequest,
  fetchScopeRequest,
} from "../../../../store/reducers/dashboard/dashboardReducer";
import { useParams } from "react-router";
import { isNewUserRequest, isScopeRequest } from "../../../../store/reducers/dashboard/reviewRequests/types";
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
    const routeParams = useParams()
  const dispatch = useDispatch();
  const app = useRealmApp();
  const [listPage, setListPage] = useState(0);
  const isUsers = pageType === "review-users";
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
  const onRequestType = () => {};
  return (
    <div id="dashboard-review-requests">
      <div id="dashboard-review-requests-inner">
        <div id="dashboard-review-requests-header">
          <div id="dashboard-review-requests-title">
            <FontAwesomeIcon icon={faCheckCircle} />
            <h1>Review Requests</h1>
          </div>
          <PaginationNav
            listStatus={listStatus}
            listStart={listStart}
            listEnd={listEnd}
            listPage={listPage}
            listInterval={listInterval}
            paginationEnd={paginationEnd}
            onPagination={isUsers ? onUsersPagination : onScopesPagination}
            list={list}
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
        </div>
        {pageType === "review-users" &&
          list?.map((request) => {
            if (isScopeRequest(request)) return <DashboardScopeRequest data={request}/>;
          })}
        {pageType === "review-scopes" &&
          list?.map((request) => {
            if (isNewUserRequest(request)) return <DashboardNewUserRequest data={request}/>;
          })}
      </div>
    </div>
  );
};
export default DashboardReviewRequests;
