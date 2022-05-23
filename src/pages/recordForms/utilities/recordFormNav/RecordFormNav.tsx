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
import { useParams } from "react-router";

const RecordFormNav = () => {
  const params = useParams();
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      spaceBetween={40}
      slidesPerView={"auto"}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className={"record-form-carousel"}
    >
      {recordFormRoutes.map((route) => {
        const formType = grabRecordFormType(route);
        return (
          <SwiperSlide
            key={formType}
            style={{ width: "auto", maxWidth: "900px" }}
          >
            <Link
              to={`../${route}`}
              className={`record-form-nav-link ${
                route === params.formid ? "selected" : ""
              }`}
            >
              {formType}
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
export default RecordFormNav;
