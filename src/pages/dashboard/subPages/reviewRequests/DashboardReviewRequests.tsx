import { useRealmApp } from "../../../../realm/RealmApp";
import { Link } from "react-router-dom";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import PaginationNav from "../../utilities/paginationNav/PaginationNav";
import DashboardRequestCard from "./DashboardRequestCard";
import React, { useState } from "react";
import {
  fetchNewUserRequest,
  fetchScopeRequest,
} from "../../../../store/reducers/dashboard/dashboardReducer";
import dashboardNewUserRequest from "./DashboardNewUserRequest";
import { useParams } from "react-router";
import {
  NewUserRequest,
  ScopeRequest,
} from "../../../../store/reducers/dashboard/reviewRequests/types";
import {
  isNewUserRequest,
  isScopeRequest,
} from "../../../../store/reducers/dashboard/reviewRequests/types";
import dashboardScopeRequest from "./DashboardScopeRequest";

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
  const list: NewUserRequest[] | ScopeRequest[] =
    pageType === "review-users"
      ? [
          {
            _id: "342148fwef29fwfe4158dw91f4w3242",
            first_name: "Arky",
            last_name: "Asmal",
            email: "arkyasmal@gmail.com",
            occupation: "Teacher",
            purpose:
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like thbruweiifbfiuw ",
            //purpose: "I need it",
            phone_number: "12345678910",
            preferred_contact: "E-mail",
            creation_date: new Date().toString(),
          },
        ]
      : [
          {
            _id: "342148fwef29fwfe4158dw91f4w3242",
            user_id: "342148fwef29fwfe4158dw91f4w3242j",
            first_name: "Arky",
            last_name: "Asmal",
            email: "arkyasmal@gmail.com",
            //purpose: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like thbruweiifbfiuw ",
            purpose: "I need it",
            category: "War Crimes",
            creation_date: new Date().toString(),
          },
        ];
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
    <div id="dashboard-review-requests">
      <div id="dashboard-review-requests-inner">
        <div id="dashboard-review-requests-header">
          <div id="dashboard-review-requests-title">
            <FontAwesomeIcon icon={faCheckCircle} />
            <h1>Review Requests</h1>
          </div>
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
        </div>
        {list?.map((request, index) => {
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
                last_id = {list[list.length - 1]._id.toString()}
              />
            );
        })}
      </div>
    </div>
  );
};
export default DashboardReviewRequests;
