import '../../styles/footer.css';
import { ROUTES } from '../root/root';
import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
        <p>© 2025 My E-Commerce App. All rights reserved.</p>
        <div className="footer-links">
            <NavLink to={ROUTES.ABOUT}>About</NavLink>
            <NavLink to={ROUTES.CONTACT}>Contact</NavLink>
            <NavLink to={ROUTES.PRIVACY} >Privacy Policy </NavLink>
         </div>
        </footer>

    )
}