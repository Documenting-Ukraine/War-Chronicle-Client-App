import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  createRecordFormRoutes,
  grabCreateRecordFormType,
} from "../../data/recordFormRoutes";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { updateRecordType } from "../../../../store/reducers/recordForms/recordFormSubmission/recordFormSubmissionReducer";
import { isCategoryScope } from "../../../../types/dataTypes/CategoryIconMap";

const RecordFormNav = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const endPath = location.pathname.split("/");
  const routeId = endPath[endPath.length - 1];
  useEffect(() => {
    const newParseUrlId = grabCreateRecordFormType(routeId);
    if (isCategoryScope(newParseUrlId))
      dispatch(updateRecordType(newParseUrlId));
  }, [routeId, dispatch]);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      spaceBetween={40}
      slidesPerView={"auto"}
      className={"record-form-carousel"}
    >
      {createRecordFormRoutes.map((route) => {
        const formType = grabCreateRecordFormType(route);
        return (
          <SwiperSlide key={formType} style={{ width: "auto" }}>
            <Link
              to={`./${route}`}
              className={`record-form-nav-link ${
                route === routeId ? "selected" : ""
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
