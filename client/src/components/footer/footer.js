import '../../styles/footer.css';
import { ROUTES } from '../root/root';
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Footer() {
    const { user, logout } = useAuth();
    return (
        <footer className="footer">
        <p>© 2025 My E-Commerce App. All rights reserved.</p>
        <div className="footer-links">
            {!user ? (
                <>
                <NavLink to={ROUTES.ABOUT}>About</NavLink>
            <NavLink to={ROUTES.CONTACT}>Contact</NavLink>
            <NavLink to={ROUTES.PRIVACY} >Privacy Policy </NavLink>
                </>
           ): (
        <>
        <NavLink to={ROUTES.ABOUT}>About</NavLink>
            <NavLink to={ROUTES.CONTACT}>Contact</NavLink>
            <NavLink to={ROUTES.PRIVACY} >Privacy Policy </NavLink>
        <button className="logout" onClick={logout}>Logout</button>
        </>
    )
            }
         </div>
        </footer>

    )
}