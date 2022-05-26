import React, { useState, useEffect } from "react";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
interface FormDropZoneProps {
  name: string;
  maxSize: number;
  maxFiles: number;
  description: string;
  mediaType: "videos" | "images";
  className?: string;
}
interface ErrorProps {
  err: boolean;
  message: string;
  files: FileRejection[];
}
type MediaFile = File & { preview: string };
const ImageThumbnail = ({ file }: { file: MediaFile }) => {
  return (
    <div className="form-img-thumbnail">
      <div className="form-img-thumbnail-inner">
        <img
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  );
};
const VideoThumbnail = ({ file }: { file: MediaFile }) => {
  return (
    <div className="form-video-thumbnail">
      <div className="form-video-thumbnail-inner">
        <video controls>
          <source
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
            src={file.preview}
          />
        </video>
      </div>
    </div>
  );
};
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
    message: "",
    files: [],
  });
      useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
      }, []);
  const onDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };
  const acceptedFiles: {
    [key: string]: string[];
  } =
    mediaType === "videos"
      ? { "video/*": [".mp4"] }
      : { "image/*": [".png", ".gif", ".jpeg", ".jpg"] };
  const thumbnails = files.map((file) => {
    if (mediaType === "images")
      return <ImageThumbnail key={file.name} file={file} />;
    if (mediaType === "videos")
      return <VideoThumbnail key={file.name} file={file} />;
  });
  return (
    <>
      <Dropzone
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
                  className: `form-inputs-dropzone ${className}`,
                })}
              >
                <label htmlFor={name}>{description}</label>
                <input {...inputProps} />
              </div>
            </section>
          );
        }}
      </Dropzone>
      <div className="d-flex w-100">{thumbnails}</div>
    </>
  );
};
export default FormDropZone;
