import { MediaAndDisInformation } from "../../../../types";
import RecordContentDataRow from "../../utilities/RecordContentDataRow";
import RecordContentListItem from "../../utilities/RecordContentListItem";
const MediaAndDisinformationPage = ({
  data,
}: {
  data: MediaAndDisInformation;
}) => {
  return (
    <>
      <RecordContentDataRow heading="Media Information: ">
        <ul>
          <RecordContentListItem heading="Type: ">
            {data.media_type !== "Other"
              ? data.media_type
              : data.custom_media_type
              ? data.custom_media_type
              : ""}
          </RecordContentListItem>
          <RecordContentListItem heading="Title: ">
            {data.media_title}
          </RecordContentListItem>
          <RecordContentListItem heading="Author: ">
            {data.author}
          </RecordContentListItem>
          <RecordContentListItem heading="Region: ">
            {data.media_region}
          </RecordContentListItem>
          <RecordContentListItem heading="Language: ">
            {data.primary_language}
          </RecordContentListItem>
          <RecordContentListItem heading="Hosting Outlet: ">
            {data.hosting_outlet}
          </RecordContentListItem>
          {data.original_outlet && (
            <RecordContentListItem heading="Original Outlet: ">
              {data.original_outlet}
            </RecordContentListItem>
          )}
        </ul>
      </RecordContentDataRow>
      <RecordContentDataRow heading="Editorial Stance: ">
        <ul>
          <RecordContentListItem heading="Stance: ">
            {data.editorial_stance?.stance}
          </RecordContentListItem>
          <RecordContentListItem heading="Quote: ">
            {data.editorial_stance?.quote}
          </RecordContentListItem>
        </ul>
      </RecordContentDataRow>
      {data.disinformation && (
        <RecordContentDataRow heading="Disinformation: ">
          <>{data.disinformation}</>
        </RecordContentDataRow>
      )}
      {data.notes && (
        <li className="w-100">
          <RecordContentDataRow heading="Notes: ">
            <>{data.notes}</>
          </RecordContentDataRow>
        </li>
      )}
    </>
  );
};
export default MediaAndDisinformationPage;
