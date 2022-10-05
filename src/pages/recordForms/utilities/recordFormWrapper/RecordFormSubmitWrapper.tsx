import { useDispatch, useSelector, batch } from "react-redux";
import { useRealmApp } from "../../../../realm/RealmApp";
import { RootState } from "../../../../store/rootReducer";
import { useDropZoneProvider } from "../../../utilityComponents/formInputs/FormDropZone/FormDropZoneContext";
import { createPortal } from "react-dom";
import { updateRecordForm } from "../../../../store/reducers/asyncActions/recordFormActions/updateRecordForms";
import { isItemInList } from "../../../../types/dataTypes/DataLists";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router";
import { CategoriesList } from "../../../../types/dataTypes/CategoryIconMap";
import { determineSubmissionType } from "../../../../store/reducers/recordForms/recordFormSubmission/determineSubmissionType";
import {
  updateErrorState,
  updateLoadingState,
} from "../../../../store/reducers/recordForms/recordFormSubmission/recordFormSubmissionReducer";
import extractGeneralInputs from "../utilityFuncs/extractGeneralInputs";
import awsS3UploadMedia from "../utilityFuncs/awsS3UploadMedia";
import PopUpBg from "../../../utilityComponents/popUpBg/PopUpBg";
import LoadingMessage from "../../../utilityComponents/loadingMessage/LoadingMessage";
import PageBanner from "../../../utilityComponents/pageBanner/PageBanner";
import { useLayoutEffect } from "react";
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
  //prevent scrolling
  useLayoutEffect(() => {
    if (loadingProgress.status) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "visible";
  }, [loadingProgress.status]);
  const createSubmission = async (fieldValues: {
    [k: string]: FormDataEntryValue;
  }) => {
    //grab the newest token
    await app.currentUser?.refreshAccessToken();
    const realmAccessToken =
      app.currentUser && app.currentUser.accessToken
        ? app.currentUser.accessToken
        : "";
    const extractedInputs = extractGeneralInputs(fieldValues);
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
      const imageUpload = awsS3UploadMedia({
        files: newImages,
        realmToken: realmAccessToken,
        recordType: recordType,
        recordTitle: extractedInputs.record_title
          ? extractedInputs.record_title
          : "",
      });
      const videoUpload = awsS3UploadMedia({
        files: newVideos,
        realmToken: realmAccessToken,
        recordType: recordType,
        recordTitle: extractedInputs.record_title
          ? extractedInputs.record_title
          : "",
      });
      const [imageUploadLinks, videoUploadLinks] = await Promise.all([
        imageUpload,
        videoUpload,
      ]);
      imageLinks = [...imageLinks, ...imageUploadLinks.uploaded];
      videoLinks = [...videoLinks, ...videoUploadLinks.uploaded];
    } catch (e) {
      console.error(e);
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
    //set record type equal to copy state to generate map
    extractedInputs.record_type = isItemInList<typeof CategoriesList[number]>(
      recordType,
      CategoriesList
    )
      ? recordType
      : undefined;
    const generalInputs = determineSubmissionType(copyState, extractedInputs);
    const additionalInputs = cloneDeep(additionalFormData.data);
    if (
      app.currentUser &&
      typeof app.currentUser.customData.first_name === "string" &&
      typeof app.currentUser.customData.last_name === "string" &&
      typeof app.currentUser.customData._id === "string"
    ) {
      const currentSubmissionUserData = {
        first_name: app.currentUser.customData.first_name,
        last_name: app.currentUser.customData.last_name,
        date_first_edited: new Date().toISOString(),
        _id: app.currentUser.customData._id,
      };
      if (additionalInputs.contributors) {
        if (
          additionalInputs.contributors.every(
            (a) => a._id !== currentSubmissionUserData._id
          )
        )
          additionalInputs.contributors = [
            ...additionalInputs.contributors,
            currentSubmissionUserData,
          ];
      } else additionalInputs.contributors = [currentSubmissionUserData];
    }

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
                      message: `Successfully created a new ${
                        res.response.new_document.record_type
                      } record. Database Id is ${res.response.new_document._id.toString()}`,
                    })
                  );
                  navigate(
                    `/records/${res.response.new_document.record_type
                      .replace(/ /g, "-")
                      .toLowerCase()}/${res.response.new_document._id.toString()}`
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
        <PopUpBg fullViewport className={"record-form-submit-loading-message"}>
          <LoadingMessage fontColor={"black"} text={loadingProgress.message} />
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
