import { isMediaLink } from "../../../utilityComponents/formInputs/Thumbnails";
import { useDropZoneProvider } from "../../../utilityComponents/formInputs/FormDropZone/FormDropZoneContext";
import { unstable_batchedUpdates } from "react-dom";
import {
  ImageThumbnail,
  VideoThumbnail,
} from "../../../utilityComponents/formInputs/Thumbnails";
const MediaThumbnails = () => {
  const {
    newImages,
    newVideos,
    storedImages,
    storedVideos,
    setNewImages,
    setNewVideos,
    setStoredImages,
    setStoredVideos,
  } = useDropZoneProvider();
  const onRemoveThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    //this file id only matches a single url, that has been uploaded
    const fileId = e.currentTarget.dataset["fileId"];
    const filterNewImages = newImages.filter((i) => i.id !== fileId);
    const filterStoredImages = storedImages.filter((i) => i.id !== fileId);
    const filterNewVideos = newVideos.filter((i) => i.id !== fileId);
    const filterStoredVideos = storedVideos.filter((i) => i.id !== fileId);
    unstable_batchedUpdates(() => {
      setNewImages(filterNewImages);
      setStoredImages(filterStoredImages);
      setNewVideos(filterNewVideos);
      setStoredVideos(filterStoredVideos);
    });
  };
  const images = [...newImages, ...storedImages];
  const videos = [...newVideos, ...storedVideos];
  if (images.length <= 0 && videos.length <= 0) return <></>;
  else
    return (
      <>
        <div className="d-flex justify-content-center w-100">
          <div className="record-form-media-thumbnail-seperator"></div>
        </div>
        <div className="record-form-media-thumbnails">
          {images.map((file) => {
            if (isMediaLink(file))
              return (
                <ImageThumbnail
                  key={file.url}
                  file={file}
                  onRemoveThumbnail={onRemoveThumbnail}
                />
              );
            else
              return (
                <ImageThumbnail
                  key={file.name}
                  file={file}
                  onRemoveThumbnail={onRemoveThumbnail}
                />
              );
          })}
          {videos.map((file) => {
            if (isMediaLink(file))
              return (
                <VideoThumbnail
                  key={file.url}
                  file={file}
                  onRemoveThumbnail={onRemoveThumbnail}
                />
              );
            else
              return (
                <VideoThumbnail
                  key={file.name}
                  file={file}
                  onRemoveThumbnail={onRemoveThumbnail}
                />
              );
          })}
        </div>
      </>
    );
};
export default MediaThumbnails