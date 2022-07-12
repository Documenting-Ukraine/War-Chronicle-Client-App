import ExitIcon from "../exitIcon/ExitIcon";
const PageBanner = ({
  bannerMessage,
  className,
  closeBanner,
}: {
  bannerMessage?: string;
  className?: string;
  closeBanner: () => void;
}) => {
  return (
    <div id="page-banner" className={`page-banner-styles ${className}`}>
      <span>{bannerMessage}</span>
      <button aria-label="close banner" onClick={() => closeBanner()}>
        <ExitIcon customStrokeWidth="0.5rem" />
      </button>
    </div>
  );
};
export default PageBanner