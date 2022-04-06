import LoadingIcon from "../loadingIcon/LoadingIcon"
const LoadingText = ({ text }: {text?: string}): JSX.Element => {
    return (
      <div className="d-flex align-items-center justify-content-center mt-4">
        <div className="loading-text">{text}</div>
      </div>
    );
}
const LoadingMessage = ({ text }: { text?: string}): JSX.Element => {
    return (
      <div className="d-flex flex-column justify-content center">
        <LoadingIcon width={"60%"} />
        <LoadingText text={text}/>
      </div>
    );
}
export default LoadingMessage