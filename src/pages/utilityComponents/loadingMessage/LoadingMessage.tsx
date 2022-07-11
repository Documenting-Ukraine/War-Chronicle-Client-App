import LoadingIcon from "../loadingIcon/LoadingIcon";
import { LoadingIconProps } from "../loadingIcon/LoadingIcon";
const LoadingText = ({ text, fontColor }: { text?: string, fontColor?: string}): JSX.Element => {
  return (
    <div className="d-flex align-items-center justify-content-center mt-4">
      <div className="loading-text" style={fontColor ? {color: fontColor }: {}}>{text}</div>
    </div>
  );
};
const LoadingMessage = ({
  text,
  width,
  strokeWidth,
  fontColor,
  entireViewPort,
  backgroundColor,
  height,
}: { text?: string, fontColor?: string} & LoadingIconProps): JSX.Element => {
  return (
    <div className="d-flex flex-column justify-content-center w-100">
      <LoadingIcon
        width={width}
        strokeWidth={strokeWidth}
        entireViewPort={entireViewPort}
        backgroundColor={backgroundColor}
        height={height}
      />
      <LoadingText fontColor = {fontColor} text={text} />
    </div>
  );
};
export default LoadingMessage;
