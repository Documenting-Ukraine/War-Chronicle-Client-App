import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import recordFormRoutes, {
  grabRecordFormType,
} from "../../data/recordFormRoutes";
import { Link } from "react-router-dom";
const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="record-form-nav-btns">
      <button
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
      >
        Hello
      </button>
      <button onClick={() => next()}>Next</button>
    </div>
  );
};

const RecordFormNav = () => {
  return (
    // <div className="record-form-carousel">
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      spaceBetween={50}
      slidesPerView={"auto"}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className={"record-form-carousel"}
    >
      {recordFormRoutes.map((route) => {
        const formType = grabRecordFormType(route);
        return (
          <SwiperSlide key={formType} style={{width: 'auto'}}>
            <Link to={`../${route}`}>{formType}</Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
    // </div>
  );
};
export default RecordFormNav;
