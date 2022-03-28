import { useEffect } from "react";
import { useRealmApp } from "../../../realm/RealmApp";
import { googleLogin } from "./googleLogin";
import { GoogleSignUp, GoogleLogin } from "../../../types/index";
/*global google */
declare const google: any;
const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID_DEV;

const GoogleBtn = ({
  btnType,
  customSuccessCallback,
  customErrorFunc,
  customData
}: GoogleLogin | GoogleSignUp) => {
  const app = useRealmApp();
    const googleCallBack = async (res: Response) => {
        try {
            const user = await googleLogin({
                res: res,
                app: app,
                customErrorFunc: customErrorFunc,
                customData: customData,
            });
            if (customSuccessCallback && user) customSuccessCallback(user);
        } catch (e) {
            console.error(e);
            if (e instanceof Error && customErrorFunc) customErrorFunc(e);
        }
    }

    useEffect(() => {
        const initializeGsi = (): any => {
        google.accounts.id.initialize({
            context: btnType === "signup" ? "signup" : "signin",
                client_id: googleClientID, 
                callback: googleCallBack
            })
        google.accounts.id.renderButton(
            document.getElementById("googleAuthBtn"),
            {
            shape: "circle",
            theme: "filled_blue",
            size: "large",
            text: btnType === "signup" ? "signup_with" : "signin_with",
            }
        );
    };
      
    const script = document.createElement("script");
    script.id = "googleLoginIdScript";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = initializeGsi();

    const documentBody = document.querySelector("body");
    if (documentBody !== null) documentBody.appendChild(script);
    //cleanup script
    return () => {
      const documentScript = document.getElementById("googleLoginIdScript");
      if (documentScript !== null) documentScript.remove();
    };
  }, [app, btnType]);
  return (
    <div>
          <button id="googleAuthBtn"/>
    </div>
  );
};
export default GoogleBtn;
