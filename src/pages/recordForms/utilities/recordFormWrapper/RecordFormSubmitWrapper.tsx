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
  updateErrorState,
  updateLoadingState,
} from "../../../../store/reducers/recordForms/recordFormSubmission/recordFormSubmissionReducer";
import PageBanner from "../../../utilityComponents/pageBanner/PageBanner";
import { CategoriesList } from "../../../../types/dataTypes/CategoryIconMap";
import { determineSubmissionType } from "../../../../store/reducers/recordForms/recordFormSubmission/determineSubmissionType";
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
      recordTitle: extractedInputs.record_title
        ? extractedInputs.record_title
        : "",
    });
    const videoUpload = awsS3UploadMedia({
      files: newVideos,
      credentials: app.awsCredentials,
      recordType: recordType,
      recordTitle: extractedInputs.record_title
        ? extractedInputs.record_title
        : "",
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
    const copyState = {
      record_type: isItemInList<typeof CategoriesList[number]>(
        recordType,
        CategoriesList
      )
        ? recordType
        : undefined,
      media: {
        images: imageLinks,
        videos: videoLinks,
      },
    };
    const generalInputs = determineSubmissionType(copyState, extractedInputs);
    const additionalInputs = cloneDeep(additionalFormData.data);
    const submissionObject = {
      recordId: recordFormId,
      generalInputs: generalInputs ? generalInputs : {},
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
                if (res) {
                  dispatch(
                    updateLoadingState({
                      status: true,
                      progressNum: 100,
                      message: `Successfully created a new ${res.new_document.record_type} record. Database Id is ${res.new_document._id}`,
                    })
                  );
                  navigate(
                    `/search/recordForms/${res.new_document.record_type}/${res.new_document._id}`
                  );
                }
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
      {err.status &&
        createPortal(
          <PageBanner
            className={"alert alert-danger record-form-err-banner"}
            bannerMessage={err.message}
            closeBanner={() => {
              dispatch(
                updateErrorState({
                  status: false,
                  message: "",
                })
              );
            }}
          />,
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
