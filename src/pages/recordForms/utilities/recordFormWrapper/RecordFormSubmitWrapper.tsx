import { useSelector } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import { RootState } from "../../../../store/rootReducer";
import { useDropZoneProvider } from "../../../utilityComponents/formInputs/FormDropZone/FormDropZoneContext";
import extractGeneralInputs from "../utilityFuncs/extractGeneralInputs";
import awsS3UploadMedia from "../utilityFuncs/awsS3UploadMedia";
import { useState } from "react";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router";
const RecordFormSubmitWrapper = ({
  recordType,
  children,
  recordFormId
}: {
  recordType: string;
  children: JSX.Element;
  recordFormId?: string;
}) => {
  const app = useRealmApp();
  const navigate = useNavigate();
  const { newImages, newVideos, storedImages, storedVideos } = useDropZoneProvider();
  const [err, setErr] = useState({
    error: false,
    message: "",
  });
  const [loadingProgress, setLoadingProgress] = useState({
    isLoading: false,
    loadingMessage: "", 
    progressNum: 100 
  })
  const additionalFormData = useSelector(
    (state: RootState) => state.recordForms.submission
  );
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
      setLoadingProgress({
        isLoading: true, 
        loadingMessage: "Uploading Media files. Please wait",
        progressNum: 0
      })
      const [imageUploadLinks, videoUploadLinks] = await Promise.all([
        imageUpload,
        videoUpload
      ]);
      imageLinks = [...imageLinks, ...imageUploadLinks];
      videoLinks = [...videoLinks, ...videoUploadLinks];
    } catch (e) {
      return setErr({
        error: true,
        message:
          "We could not upload your media files. Please try editing the record, and uploading them again",
      });
    }
    const generalInputs = {
      ...extractedInputs,
      record_type: recordType,
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
    createSubmission(fieldValues)
      .then((payload) => {
        setLoadingProgress({
          isLoading: true, 
          loadingMessage: "Uploading Record Content",
          progressNum: 50
        })
        const documentId = app.currentUser?.callFunction(
          "upload_record_form",
          payload
        );
        setLoadingProgress({
          isLoading: true,
          loadingMessage: "Record Successfully Uploaded",
          progressNum: 100
        })
        navigate(`/search/recordForms/${recordType}/${documentId}`);
      })
      .catch((e) => console.error(e));
  };
  return (
    <form onSubmit={onSubmit}>
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
