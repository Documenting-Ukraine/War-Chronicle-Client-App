import { memo } from "react";
import { UserDocument } from "../../../../types/dataTypes";
import DashboardUser from "./DashboardUser"
import {UserSortProps} from "./types";

interface DashboardUserColumnProps {
  userSort: UserSortProps;
  title: string;
  sort?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userList: UserDocument[];
  userListStart: number;
  userListEnd: number;
  columnType: "avatar" | "email" | "date" | "actionBtn";
}
const lightBtnStyles = {opacity: 0.5}
const DashboardUserColumn = ({
    title,
    sort, 
    userList, 
    userListStart,
    userListEnd,
    userSort,
    columnType
}: DashboardUserColumnProps) => {
    const lowerTitle = title === "Joined" ? "join_date": title.toLowerCase()
    const userSortColumn = userSort?.key
    const direction = userSort?.direction
    return (
      <div className={`dashboard-user-column ${title}`}>
        <div className={"dashboard-user-column-title"}>
          <h5>{title}</h5>
          {sort && (
            <div className="sorting-pointers">
              <button
                onClick={sort}
                data-column={lowerTitle}
                data-direction={"ascending"}
                style={
                  userSortColumn === lowerTitle && direction === "ascending"
                    ? undefined
                    : lightBtnStyles
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 321 193">
                  <path d="M27.6601 192.027H292.36C316.96 192.027 329.25 162.247 311.9 144.907L179.6 8.107C174.194 2.701 167.13 0 160.07 0C153.015 0 145.98 2.701 140.62 8.107L8.11914 144.927C-9.22886 162.227 3.05514 192.027 27.6601 192.027Z" />
                </svg>
              </button>
              <button
                onClick={sort}
                data-column={lowerTitle}
                data-direction={"descending"}
                style={
                  userSortColumn === lowerTitle && direction === "descending"
                    ? undefined
                    : lightBtnStyles
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 192">
                  <path d="M311.897 47.1L179.497 183.9C174.097 189.3 167.097 192 159.997 192C152.942 192 145.877 189.298 140.527 183.891L8.12673 47.091C-9.23227 29.8 3.05173 0 27.6567 0H292.357C316.897 0 329.197 29.8 311.897 47.1Z" />
                </svg>
              </button>
            </div>
          )}
        </div>
        {userList &&
          userList
            .slice(userListStart, userListEnd)
            .map((user, index) => (
              <DashboardUser
                index={userListStart + index}
                key={user._id}
                user={user}
                elementType={columnType}
              />
            ))}
      </div>
    );
}
export default memo(DashboardUserColumn)