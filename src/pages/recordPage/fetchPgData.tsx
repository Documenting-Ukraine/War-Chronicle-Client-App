import { RealmApp } from "../../realm/RealmApp";
import { isFetchRecordFormsResult } from "../../store/reducers/asyncActions/recordFormActions/fetchRecordForms";
const fetchPageData = async (recordId: string | undefined, app: RealmApp) => {
    if (!recordId) throw Error("Invalid record id");
    const input = {
      searchQuery: {
        _ids: [recordId],
      },
    };
    const data = await app.currentUser?.callFunction(
      "search_records_public",
      input
    );
    if (isFetchRecordFormsResult(data) && data.results && data.results.length > 0)
      return data.results[0];
    else throw Error("Could not find the record");
  };
export default fetchPageData