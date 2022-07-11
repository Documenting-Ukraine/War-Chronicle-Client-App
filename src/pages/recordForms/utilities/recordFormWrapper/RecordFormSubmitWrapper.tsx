import { useDispatch, useSelector, batch } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import { RootState } from "../../../../store/rootReducer";
import { useDropZoneProvider } from "../../../utilityComponents/formInputs/FormDropZone/FormDropZoneContext";
import extractGeneralInputs from "../utilityFuncs/extractGeneralInputs";
import awsS3UploadMedia from "../utilityFuncs/awsS3UploadMedia";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router";
import PopUpBg from "../../../utilityComponents/popUpBg/PopUpBg";
import LoadingMessage from "../../../utilityComponents/loadingMessage/LoadingMessage";
import { createPortal } from "react-dom";
import { updateRecordForm } from "../../../../store/reducers/asyncActions/recordFormActions/updateRecordForms";
import { isItemInList } from "../../../../types/dataTypes/DataLists";
import {
  RecordFormSubmssionProps,
  updateErrorState,
  updateLoadingState,
} from "../../../../store/reducers/recordForms/recordFormSubmission/recordFormSubmissionReducer";
import FormErrBanner from "../../../utilityComponents/formErrBanner/FormErrBanner";
const RecordFormSubmitWrapper = ({
  recordType,
  children,
  recordFormId,
}: {
  recordType: string;
  children: JSX.Element;
  recordFormId?: string;
}) => {
  const app = useRealmApp();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newImages, newVideos, storedImages, storedVideos } =
    useDropZoneProvider();
  const additionalFormData = useSelector(
    (state: RootState) => state.recordForms.submission
  );
  const err = additionalFormData.status.err;
  const loadingProgress = additionalFormData.status.loading;
  const createSubmission = async (fieldValues: {
    [k: string]: FormDataEntryValue;
  }) => {
    const extractedInputs = extractGeneralInputs(fieldValues);
    const imageUpload = awsS3UploadMedia({
      files: newImages,
      credentials: app.awsCredentials,
      recordType: recordType,
      recordTitle: extractedInputs.record_title,
    });
    const videoUpload = awsS3UploadMedia({
      files: newVideos,
      credentials: app.awsCredentials,
      recordType: recordType,
      recordTitle: extractedInputs.record_title,
    });
    let imageLinks: string[] = storedImages;
    let videoLinks: string[] = storedVideos;
    try {
      dispatch(
        updateLoadingState({
          status: true,
          message: "Uploading New media files. Please wait",
          progressNum: 0,
        })
      );
      const [imageUploadLinks, videoUploadLinks] = await Promise.all([
        imageUpload,
        videoUpload,
      ]);
      imageLinks = [...imageLinks, ...imageUploadLinks];
      videoLinks = [...videoLinks, ...videoUploadLinks];
    } catch (e) {
      dispatch(
        updateErrorState({
          status: true,
          message:
            "We could not upload your media files. Please try editing the record, and uploading them again",
        })
      );
    }
    const recordTypeArr = [
      "International Response",
      "Media And Disinformation",
      "Russia",
      "Refugees And IDPs",
      "War Crimes",
      "Protests Abroad",
    ] as const;
    const generalInputs: RecordFormSubmssionProps = {
      ...extractedInputs,
      record_type: isItemInList<typeof recordTypeArr[number]>(
        recordType,
        recordTypeArr
      )
        ? recordType
        : undefined,
      media: {
        imageLinks,
        videoLinks,
      },
    };
    const additionalInputs = cloneDeep(additionalFormData);
    const submissionObject = {
      recordId: recordFormId,
      generalInputs,
      additionalInputs,
    };
    return submissionObject;
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    createSubmission(fieldValues).then(async (payload) => {
      if (payload) {
        batch(() => {
          dispatch(
            updateLoadingState({
              status: true,
              progressNum: 80,
              message: "Uploading all record content to database",
            })
          );
          dispatch(
            updateRecordForm({
              app: app,
              input: payload,
              callback: (res) => {
                if (res)
                  navigate(
                    `/search/recordForms/${res.new_document.record_type}/${res.new_document._id}`
                  );
              },
            })
          );
        });
      }
    });
  };
  return (
    <form onSubmit={onSubmit}>
      {loadingProgress.status && (
        <PopUpBg fullViewport>
          <LoadingMessage fontColor={"white"} text={loadingProgress.message} />
        </PopUpBg>
      )}
      {!err.status &&
        createPortal(
          <div >
            <FormErrBanner
              formErr={{
                err: err.status,
                message: err.message,
              }}
              setFormErr={() => {
                dispatch(
                  updateErrorState({
                    status: false,
                    message: "",
                  })
                );
              }}
            />
          </div>,
          document.body
        )}
      {children}
      <button
        className={"record-form-submit-btn"}
        type="submit"
        aria-label={"submit-new-record"}
      >
        <span>Submit</span>
      </button>
    </form>
  );
};
export default RecordFormSubmitWrapper;
