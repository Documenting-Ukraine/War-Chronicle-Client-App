import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import {
  MediaFile,
  VideoThumbnail,
  ImageThumbnail,
  generateFileMap,
} from "./Thumbnails";
interface FormDropZoneProps {
  name: string;
  maxSize: number;
  maxFiles: number;
  description: string | JSX.Element;
  mediaType: "videos" | "images";
  className?: string;
}
interface ErrorProps {
  err: boolean;
  files: FileRejection[];
}

const FormDropZone = ({
  name,
  maxSize,
  maxFiles,
  description,
  mediaType,
  className,
}: FormDropZoneProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [err, setErr] = useState<ErrorProps>({
    err: false,
    files: [],
  });
  const [isOver, setIsOver] = useState(false)
  useEffect(() => {
    let mounted = true;
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      if (mounted) files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  const onDragEnter = () =>{
    setIsOver(true)
  }
  const onDragLeave = () =>{
    setIsOver(false)
  }
  const onDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    unstable_batchedUpdates(() =>{
      setIsOver(false)
      setFiles((state) => {
        const map = generateFileMap(files);
        const allFiles = acceptedFiles.map((file) => {
          if (file.name in map) return null;
          else
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
        });
        const isMediaFiles = (file: MediaFile | null): file is MediaFile =>
          file !== null;
  
        const newFiles: MediaFile[] = allFiles.filter(isMediaFiles);
        return [...state, ...newFiles];
      });
      setErr({
        err: fileRejections.length > 0,
        files: fileRejections,
      });
    })
  };
  const onRemoveThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileName = e.currentTarget.dataset["fileName"];
    setFiles((files) => files.filter((file) => file.name !== fileName));
  };
  const onRemoveErr = (e: React.MouseEvent<HTMLButtonElement>) => {
    const fileName = e.currentTarget.dataset["fileName"];
    setErr((state) => {
      const newState = { ...state };
      const newFiles = newState.files.filter((a) => a.file.name !== fileName);
      newState.files = newFiles;
      if (newFiles.length <= 0) {
        newState.err = false;
        return newState;
      }
      return newState;
    });
  };
  const acceptedFiles: {
    [key: string]: string[];
  } =
    mediaType === "videos"
      ? { "video/*": [".mp4"] }
      : { "image/*": [".png", ".gif", ".jpeg", ".jpg"] };
  const thumbnails = files.map((file) => {
    if (mediaType === "images")
      return (
        <ImageThumbnail
          key={file.name}
          file={file}
          onRemoveThumbnail={onRemoveThumbnail}
        />
      );
    if (mediaType === "videos")
      return (
        <VideoThumbnail
          key={file.name}
          file={file}
          onRemoveThumbnail={onRemoveThumbnail}
        />
      );
  });

  return (
    <>
      <Dropzone
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        accept={acceptedFiles}
        multiple
        maxSize={maxSize}
        maxFiles={maxFiles}
      >
        {({ getRootProps, getInputProps }) => {
          const inputProps = { ...getInputProps(), name: name, id: name };
          return (
            <section>
              <div
                {...getRootProps({
                  className: `form-inputs-dropzone ${className} ${isOver? "over-dropzone": ""}`,
                })}
              >
                <label htmlFor={name}>
                  <div>
                    <FontAwesomeIcon icon={faUpload} />
                  </div>
                  <span>
                   {description}
                  </span>
                </label>
                <input {...inputProps} />
              </div>
              {err.err && (
                <div className="form-inputs-err-container">
                  {err.files.map((f) => {
                    return (
                      <div
                        key={f.file.name}
                        className="form-inputs-dropzone-err"
                      >
                        <button
                          className="err-exit-btn"
                          aria-label={"close-error-message"}
                          data-file-name={f.file.name}
                          onClick={onRemoveErr}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <h5 className="dropzone-err-heading">{`File: ${f.file.name}`}</h5>
                        <div className="dropzone-err-body">
                          <h6>Errors:</h6>
                          {f.errors.map((e) => (
                            <li key={e.code}>{e.message}</li>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {thumbnails.length > 0 && (
                <div className="thumbnails-container">{thumbnails}</div>
              )}
            </section>
          );
        }}
      </Dropzone>
    </>
  );
};
export default FormDropZone;
