import { useEffect } from "react";
import { useRealmApp } from "../../../realm/RealmApp";
import { googleAuth } from "./googleAuth";
import { GoogleSignUp, GoogleLogin } from "../../../types/index";
import { GoogleCredientals } from "../../../types/auth/GoogleAuth";
import { User } from "realm-web";
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
    const googleCallBack = async (res: GoogleCredientals) => {
        try {
            let user
            if(btnType === "signup")user = await googleAuth({
                res: res,
                app: app,
                customErrorFunc: customErrorFunc,
                customData: customData,
                auth_type: "signup"
            });
            else user = await googleAuth({
              res: res,
              app: app,
              customErrorFunc: customErrorFunc,
              auth_type: "signin",
              customData: null
            });
            if (customSuccessCallback && user instanceof User) customSuccessCallback(user);

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
          callback: googleCallBack,
        });
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
      // eslint-disable-next-line
    }, [app, btnType]);
    
  return (
    <div>
          <button id="googleAuthBtn"/>
    </div>
  );
};
export default GoogleBtn;
