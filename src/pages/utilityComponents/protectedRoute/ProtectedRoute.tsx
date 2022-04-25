import { indexOf } from "lodash";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useRealmApp } from "../../../realm/RealmApp";

function RequireAuth({ children }: { children: JSX.Element }) {
  let app = useRealmApp();
  let location = useLocation();
  if (!app.currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/forms/login" state={{ from: location }} replace />;
  }

  return children;
}

function RequireStrictAuth({
  path,
  children,
}: {
  children: JSX.Element;
  path: string;
}) {
  let app = useRealmApp();
  const params = useParams();
  const location = useLocation();
  const pathNameArr = location.pathname.split("/")
  //this is if a logged in user tries to access another user's page
  if (app.currentUser && app.currentUser.id !== params.id) {
    const paramsIdIdx = pathNameArr.indexOf(typeof params.id === "string"? params.id: '') 
    pathNameArr.splice(paramsIdIdx,1,app.currentUser.id)
    const newPath = pathNameArr.reduce((first, end) => first + "/" + end)
    return <Navigate to={newPath} state={{ from: location }} replace />;
  }
  return <RequireAuth>{children}</RequireAuth>;
}
function RequireNonGuestAccount({ children }: { children: JSX.Element }) {
  let app = useRealmApp();
  let location = useLocation();
  if (app.currentUser && app.currentUser.providerType === "anon-user") {
    return <Navigate to="/forms/join" state={{ from: location }} replace />;
  }
  return <RequireAuth>{children}</RequireAuth>;
}
function RequireNonGuestAndOwner({
  children,
}: {
  children: JSX.Element;
  path: string;
}) {
  let app = useRealmApp();
  const location = useLocation();
  if (app.currentUser && app.currentUser.providerType === "anon-user") {
    return <Navigate to="/forms/join" state={{ from: location }} replace />;
  }

  return (
    <RequireStrictAuth path={location.pathname}>
      {children}
    </RequireStrictAuth>
  );
}
function RequireNoUser({ children, allowGuest = false}: {
    children: JSX.Element,
    allowGuest?: boolean
}) {
    let app = useRealmApp();
    if (app.currentUser) {
        if (app.currentUser.providerType === "anon-user" && !allowGuest) {
            return <Navigate to={"/search"}/>
        }
        if (app.currentUser.providerType === "custom-function") {
            return <Navigate to={`/dashboard/${app.currentUser.id}`} />
        }
    }
    return children 
}
export {
  RequireAuth,
  RequireStrictAuth,
  RequireNonGuestAccount,
  RequireNonGuestAndOwner,
  RequireNoUser
};
