import { useEffect } from "react";
import { useRealmApp } from "../../../realm/RealmApp";
import { googleLogin } from "./googleLogin";
/*global google */
declare const google: any
const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const GoogleBtn = ({
  btnType,
  customSuccessCallback,
  customErrorFunc,
  customData
}:{
  btnType: "login"|"signup",
  customSuccessCallback: null | ((e :Event) => void),
  customErrorFunc: (e: Error) => void,
  customData: {
    occupation: string;
    phoneNumber: string | null;
  }
}) => {
  const app = useRealmApp();
  useEffect(() => {
    const initializeGsi = ():any => {
      google.accounts.id.initialize({
        context: btnType === "signup" ? "signup" : "signin",
        client_id: googleClientID,
        callback: async (res: Response) => {
          try {
              const user = await googleLogin({
                  res: res,
                  //app: app,
                  customErrorFunc: customErrorFunc,
                  customData: customData
                });
            if (customSuccessCallback && user) customSuccessCallback(user);
          } catch (e) {
            console.error(e);
            if (e instanceof Error && customErrorFunc) customErrorFunc(e);
          }
        },
      });
      google.accounts.id.prompt((notification:any) => {
        if (notification.isNotDisplayed()) {
          console.log(notification.getNotDisplayedReason());
        } else if (notification.isSkippedMoment()) {
          console.log(notification.getSkippedReason());
        } else if (notification.isDismissedMoment()) {
          console.log(notification.getDismissedReason());
        }
      });
    };
    const script = document.createElement("script");
    script.id = "googleLoginIdScript";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = initializeGsi();

    const documentBody = document.querySelector("body")
    if(documentBody !== null) documentBody.appendChild(script);
    //cleanup script
      return () => {
          const documentScript = document.getElementById("googleLoginIdScript")
          if(documentScript !== null) documentScript.remove()
      };
  }, [app, btnType, customSuccessCallback, customErrorFunc]);
  return (
    <div>
      <button className="mb-2 entry-google-btn">
        <div
          className="g_id_signin entry-g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text={btnType === "signup" ? "signup_with" : "signin_with"}
          data-size="large"
          data-logo_alignment="left"
        ></div>
      </button>
    </div>
  );
};
export default GoogleBtn;
