import { RecordSubmissionType } from "../../types";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MediaLink } from "../../types/dataTypes/GeneralRecordType";
import { useState } from "react";
const MediaFile = ({
  type,
  link,
  wrapper,
}: {
  type?: "image" | "video";
  link?: string;
  wrapper?: (e: JSX.Element) => JSX.Element;
}) => {
  const mediaType =
    type === "image" ? (
      <img src={link} alt="" />
    ) : type === "video" ? (
      <video>
        <source src={link} />
      </video>
    ) : null;
  if (wrapper && mediaType) return wrapper(mediaType);
  else
    return (
      <>
        {mediaType}
      </>
    );
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
  return (
    <div className={`${namespace}-media-presentation`}>
      <MediaFile type={currMedia?.type} link={currMedia?.link} />
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        spaceBetween={40}
        slidesPerView={"auto"}
        className={`${namespace}-content-carousel`}
        onSlideChange={(e) => {
          console.log(e.clickedIndex);
          setCurrMediaIdx(e.clickedIndex);
        }}
        slideActiveClass="active-media"
      >
        {media &&
          media.map((m) => (
            <SwiperSlide className={`${namespace}-caro-media-item`}>
              <MediaFile type={m.type} link={m.link} />
            </SwiperSlide>
          ))}
      </Swiper>
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
    ? images.map((i) => ({ type: "image", link: i }))
    : [];
  const typedVideos: { type: "video"; link: string }[] = videos
    ? videos.map((v) => ({ type: "video", link: v }))
    : [];
  const allMedia = [...typedImages, ...typedVideos];
  return <MediaPresentation namespace={namespace} media={allMedia} />;
};
export default RecordPageMedia;
