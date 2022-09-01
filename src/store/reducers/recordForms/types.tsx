import { RecordSubmissionType } from "../../../types";
import { CategoriesList } from "../../../types/dataTypes/CategoryIconMap";

export type LoadingStatus = { status: "loading" | "success" | "failed" };

export type SelectedRecord = {
  data: RecordSubmissionType | null;
};
export type RecordFormSearchQuery = {
  value?: string;
  _ids?: string[];
  categories?: string[];
  containsMedia?: boolean | undefined;
  contributors?: string[];
  date?: {
    eventDate?: {
      startDate: Date | string;
      endDate: Date | string;
    };
    recordCreation?: {
      startDate: Date | string;
      endDate: Date | string;
    };
  };
  sortBy?:
    | "relevance"
    | "oldest_event_date"
    | "newest_event_date"
    | "oldest_creation_date"
    | "newest_creation_date";
};
export type SearchRecordData = {
  data: RecordSubmissionType[];
  pagination_end: boolean;
  prev_search: RecordFormSearchQuery;
  idx_counter: number;
};
export type RecordFormReducerProps = {
  searched_data: SearchRecordData & LoadingStatus;
  selected_record: SelectedRecord & LoadingStatus;
};
