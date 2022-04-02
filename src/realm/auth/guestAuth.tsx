import * as Realm from "realm-web";
import { GoogleLogin } from "../../types";
import { RealmApp } from "../RealmApp";

interface anonCustomData {
  purpose: string;
  organization: {
    selected: boolean;
    orgName: string;
  };
  occupation: string;
}
interface addedProps {
  app: RealmApp;
  customData: anonCustomData;
}
type guestProps = Pick<
  GoogleLogin,
  "customErrorFunc" | "customSuccessCallback"
> &
  addedProps;
const guestLogin = async ({
  app,
  customData,
  customErrorFunc,
  customSuccessCallback,
}: guestProps) => {
  //login user
  if (app.currentUser) app.logOut();
  //logout all previous users.
  //Only one should have access to the account
  const pastUsers = app.app.allUsers;
  const pastUserKeys = Object.keys(pastUsers);
  if (pastUserKeys.length > 0) {
    const userArray = pastUserKeys.map((key) => pastUsers[key].logOut());
    Promise.all(userArray);
  }
  const credentials = Realm.Credentials.anonymous();
  let currentUser = null;
  try {
    currentUser = await app.logIn(credentials, customErrorFunc);
  } catch (e) {
    console.error(e);
    if (e instanceof Realm.MongoDBRealmError) customErrorFunc(e);
    await app.logOut();
  }
  //this data is useful, but not necessarily essential
  // so we can login first
  if (app instanceof Realm.App)
    app.currentUser?.callFunction("guest_login_form", customData);
  if (currentUser instanceof Realm.User && customSuccessCallback)
    customSuccessCallback(currentUser);
  return currentUser;
};
export default guestLogin;
