import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import PaginationNav from "../utilities/paginationNav/PaginationNav";
import DashboardReviewNewScopes from "./DashboardReviewNewScopes";
import React, { useState } from "react";
const DashboardReviewRequests = ({
  pageType,
}: {
  pageType: "review-users" | "review-scopes";
    }) => {
    const reviewUsers = useSelector((state: RootState) => state.dashboard.reviewNewUserRequests)
    const reviewScopes = useSelector((state: RootState) => state.dashboard.reviewScopeRequests)
    const [listPage, setListPage] = useState(0);
    const isUsers = pageType === "review-users"
    const list = isUsers ? reviewUsers.data : reviewScopes.data
    const listInterval = 5
    const listStart = listPage * listInterval
    const listEnd = (listPage + 1) * listInterval
    const listStatus = isUsers? reviewUsers.status: reviewScopes.status
    const paginationEnd = isUsers ? reviewUsers.pagination_end : reviewScopes.pagination_end 
    const onUsersPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
        
    }
    const onScopesPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
        
    }
    return (
      <div id="dashboard-review-requests">
        <div id="dashboard-review-requests-inner">
          <div id="dashboard-review-requests-header">
            <div id="dashboard-review-requests-title">
              <FontAwesomeIcon icon={faCheckCircle} />
              <h1>Review Requests</h1>
            </div>
            <PaginationNav
                listStatus = {listStatus}
                listStart = {listStart}
                listEnd = {listEnd}
                listPage = {listPage}
                listInterval = {listInterval}
                paginationEnd={paginationEnd}
                onPagination={isUsers ? onUsersPagination : onScopesPagination}
                list = {list}
            >
                <>
                
                </>
            </PaginationNav>
          </div>
            {pageType === "review-users" && <DashboardReviewNewScopes />}
            {pageType === "review-scopes" && <DashboardReviewNewScopes />}
        </div>
      </div>
    );
};
export default DashboardReviewRequests;
