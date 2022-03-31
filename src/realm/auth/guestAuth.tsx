import { User } from "realm-web";
import { GoogleLogin } from "../../types";
interface anonCustomData{
  purpose: string, 
  organization: {
    selected: boolean, orgName: string
  },
  occupation: string
}
interface addedProps{
  app: Object, 
  customData: anonCustomData
}
type guestProps = Pick<GoogleLogin, "customErrorFunc"|"customSuccessCallback"> & addedProps 
const guestLogin = ({
  app,
  customData,
  customErrorFunc,
  customSuccessCallback,
}: guestProps) => {
    
};
export default guestLogin