const ViewPortWrapper = ({ children }: { children: JSX.Element }) => {
  return <div className="loading-icon-entire-viewport">{children}</div>;
};
const Icon = ({
  width,
  strokeWidth,
}: {
  width?: number | string;
  strokeWidth?: number | string;
}) => {
  return (
    <div className={`loading-icon-container`} style={{ width: width }}>
      <svg className="loading-icon-circle" viewBox="25 25 50 50">
        <circle
          className="loading-icon-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={strokeWidth}
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};
const LoadingIcon = ({
  width = 100,
  strokeWidth = 3,
  entireViewPort = false,
}: {
  width?: number | string;
  strokeWidth?: number | string;
  entireViewPort?: boolean;
}): JSX.Element => {
  return (
    <>
      {entireViewPort ? (
        <ViewPortWrapper>
          <Icon width={width} strokeWidth={strokeWidth} />
        </ViewPortWrapper>
      )
        : <Icon width={width} strokeWidth={strokeWidth} />
      }
    </>
  );
};
export default LoadingIcon;
