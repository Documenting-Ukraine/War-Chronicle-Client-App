import { RecordSubmissionType } from "../../types";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MediaLink } from "../../types/dataTypes/GeneralRecordType";
import { useEffect, useState } from "react";
const mediaFileDomain = `https://${process.env.REACT_APP_MEDIA_FILES_DOMAIN}`;
const MediaFile = ({
  type,
  link,
  className,
  wrapper,
}: {
  type?: "image" | "video";
  link?: string;
  className?: string;
  wrapper?: (e: JSX.Element) => JSX.Element;
}) => {
  const mediaType =
    type === "image" ? (
      <img
        key={link}
        src={link}
        alt=""
        className={className ? className : ""}
      />
    ) : type === "video" ? (
      <video key={link} className={className ? className : ""}>
        <source src={link} />
      </video>
    ) : null;
  if (wrapper && mediaType) return wrapper(mediaType);
  else return <>{mediaType}</>;
};
const MediaPresentation = ({
  namespace,
  media,
}: {
  namespace: string;
  media?: { type: "image" | "video"; link: MediaLink }[];
}) => {
  const [currMediaIdx, setCurrMediaIdx] = useState(0);
  const currMedia = media && media[currMediaIdx];
  //this is dom manipulation is required
  // here because if not, the media presentation
  // will not be sticky and scroll down with content
  useEffect(() => {
    const rootNode = document.getElementById("root");
    if (rootNode) rootNode.style.overflow = "visible";
    return () => {
      const node = document.getElementById("root");
      if (node) node.style.overflow = "";
    };
  }, []);
  if (!media) return <></>;
  return (
    <div className={`${namespace}-media-presentation`}>
      <MediaFile
        type={currMedia?.type}
        link={currMedia?.link}
        wrapper={(children: JSX.Element) => (
          <div className="main-media-file">{children}</div>
        )}
      />
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        slidesPerView={"auto"}
        className={`${namespace}-media-carousel`}
      >
        {media.map((m, idx) => (
          <SwiperSlide
            onClick={() => setCurrMediaIdx(idx)}
            key={m.link}
            className={`${namespace}-caro-media-item ${
              idx === currMediaIdx ? "active-media" : ""
            }`}
          >
            <MediaFile type={m.type} link={m.link} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`${namespace}-media-caption`}>
        {currMediaIdx+1} of {media.length} media files
      </div>
    </div>
  );
};

const RecordPageMedia = ({
  media,
  namespace,
}: {
  namespace: string;
  media: RecordSubmissionType["media"];
}) => {
  if (!media) return <></>;
  //transform data
  const images = media.images;
  const videos = media.videos;
  const typedImages: { type: "image"; link: string }[] = images
    ? images.map((i) => ({ type: "image", link: `${mediaFileDomain}/${i}` }))
    : [];
  const typedVideos: { type: "video"; link: string }[] = videos
    ? videos.map((v) => ({ type: "video", link: `${mediaFileDomain}/${v}` }))
    : [];
  const allMedia = [...typedImages, ...typedVideos];
  return <MediaPresentation namespace={namespace} media={allMedia} />;
};
export default RecordPageMedia;
