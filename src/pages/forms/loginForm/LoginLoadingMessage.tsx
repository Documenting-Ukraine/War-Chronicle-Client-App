import LoadingIcon from "../../utilityComponents/loadingIcon/LoadingIcon"
import { useEffect, useState } from "react"
const LoginLoadingText = (): JSX.Element => {

    return (
      <div className="d-flex align-items-center justify-content-center mt-4">
        <div className="login-loading-text">Logging in</div>
        <div style={{position: "relative"}}>
          <div className="ball bounce"></div>
          <div className="ball bounce"></div>
          <div className="ball bounce"></div>
        </div>
      </div>
    );
}
const LoginLoadingMessage = (): JSX.Element => {
    return (
      <div className="d-flex flex-column justify-content center">
        <LoadingIcon width={"50%"} />
        <LoginLoadingText />
      </div>
    );
}
export default LoginLoadingMessage