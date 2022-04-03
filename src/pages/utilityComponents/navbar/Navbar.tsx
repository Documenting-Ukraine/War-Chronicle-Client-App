import { Link } from "react-router-dom"
import { useRealmApp } from "../../../realm/RealmApp";
import UserDropdown from "../userDropdown/UserDropdown";
const Navbar = (): JSX.Element => {
    const app = useRealmApp()
    const customData = app.currentUser?.customData
    const firstName = customData?.last_name
    const lastName = customData?.first_name
    let userName
    if (!firstName || !lastName) userName = undefined;
    else userName = firstName + " " + lastName

    const email = app.currentUser?.customData?.email
    return (
      <nav id="navbar">
        <div>Navbar</div>
        <div className="navbar-links-container">
          <div className="navbar-links">
            <Link to={"/categories"}>Categories</Link>
            <Link to={"/search"}>Search</Link>
            <Link to={"/about"}>About</Link>
          </div>
          <div className="nav-link-divider"></div>
                {app.currentUser ? 
                <UserDropdown 
                    currentUser = {app.currentUser}
                    logOut = {app.logOut}
                    name = {typeof userName === "string"? userName : undefined}
                    email = {typeof email === "string"? email : undefined}
                />
                
                : <Link className="auth-link" to={"/forms/login"}>
                    Login
                </Link>
                }
          
        </div>
      </nav>
    );
}
export default Navbar