
import Footer from "../footer/Footer"
import Navbar from "../navbar/Navbar"
const NavWrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
    return (
        <>
        <Navbar />
            {children}
        <Footer />
        </>
    )
}

export default NavWrapper