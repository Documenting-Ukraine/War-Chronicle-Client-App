const ViewPortWrapper = ({
  children,
  backgroundColor,
  height,
}: {
  children: JSX.Element;
  backgroundColor?: string;
  height?: string | number;
}) => {
  const styles = { backgroundColor: backgroundColor, height: height };
  return (
    <div className="loading-icon-entire-viewport" style={styles}>
      {children}
    </div>
  );
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
  height,
  strokeWidth = 3,
  entireViewPort = false,
  backgroundColor,
}: {
  width?: number | string;
  strokeWidth?: number | string;
  entireViewPort?: boolean;
  backgroundColor?: string;
  height?: string | number
}): JSX.Element => {
  return (
    <>
      {entireViewPort ? (
        <ViewPortWrapper backgroundColor={backgroundColor} height = {height}>
          <Icon width={width} strokeWidth={strokeWidth} />
        </ViewPortWrapper>
      ) : (
        <Icon width={width} strokeWidth={strokeWidth} />
      )}
    </>
  );
};
export default LoadingIcon;
