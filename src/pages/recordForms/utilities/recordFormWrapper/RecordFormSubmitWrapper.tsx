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
}: {
  recordType: string;
  children: JSX.Element;
}) => {
  const app = useRealmApp();
  const navigate = useNavigate();
  const { images, videos } = useDropZoneProvider();
  const [err, setErr] = useState({
    error: false,
    message: "",
  });
  const additionalFormData = useSelector(
    (state: RootState) => state.recordForms.submission
  );
  const createSubmission = async (fieldValues: {
    [k: string]: FormDataEntryValue;
  }) => {
    const extractedInputs = extractGeneralInputs(fieldValues);
    const imageUpload = awsS3UploadMedia({
      files: images,
      credentials: app.awsCredentials,
      recordType: recordType,
      recordTitle: extractedInputs.record_title,
    });
    const videoUpload = awsS3UploadMedia({
      files: videos,
      credentials: app.awsCredentials,
      recordType: recordType,
      recordTitle: extractedInputs.record_title,
    });
    let imageLinks: string[];
    let videoLinks: string[];
    try {
      const [imageUploadLinks, videoUploadLinks] = await Promise.all([
        imageUpload,
        videoUpload,
      ]);
      imageLinks = imageUploadLinks;
      videoLinks = videoUploadLinks;
    } catch (e) {
      return setErr({
        error: true,
        message:
          "Form Submission failed. We could not upload your media files.",
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
        const documentId = app.currentUser?.callFunction(
          "upload_record_form",
          payload
        );
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
