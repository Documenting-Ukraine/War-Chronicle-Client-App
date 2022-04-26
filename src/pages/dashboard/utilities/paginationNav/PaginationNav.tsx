import useWindowWidth from "../../../../hooks/use-window-width";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PaginationNav = ({
  listStatus,
  listStart,
  listEnd,
  listPage,
  listInterval,
  paginationEnd,
  onPagination,
  list,
  children,
}: {
  listStatus: "loading" | "success" | "failed";
  listStart: number;
  listEnd: number;
  listPage: number;
  listInterval: number;
  paginationEnd: boolean;
  onPagination: (e: React.MouseEvent<HTMLButtonElement>) => void;
  list: Array<Object> | undefined | null;
  children: JSX.Element;
}) => {
  const smallWidth = useWindowWidth(575);
  return (
    <div className="dashboard-pagination-nav">
      <div className="dashboard-pagination-type">{children}</div>
      <div className="dashboard-pagination-count">
        {smallWidth && (
          <p className="pagination-count">
            {listStatus !== "loading"
              ? `${
                  list && list.length > 0
                    ? (listPage + 1) * listInterval <= list.length
                      ? `${listStart + 1}-${listEnd}`
                      : `${listStart + 1}-${list.length}`
                    : "0"
                } of ${
                  list
                    ? list.length - listStart >= listInterval && !paginationEnd
                      ? "many"
                      : list.length
                    : "0"
                }`
              : `${listStart + 1}-${listEnd} of many`}
          </p>
        )}

        <button data-action-type="prev-pg" onClick={onPagination}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button data-action-type="next-pg" onClick={onPagination}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};
export default PaginationNav