import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Footer from "../footer/footer";

export const ROUTES = {
  REGISTRATIONS: "/registrationPage",
  PRODUCTS: "/products",
  LOGIN: "/loginPage",
  HOME: "/homePage",
  PRODUCT: "/productsPage",
  ACCOUNT: "/accountPage",
  CART: "/cartPage",
  ABOUT: "/aboutPage",
  CONTACT: "/contactPage",
  PRIVACY: 'privacyPolicyPage',
};

function Root() {
  const { user, logout } = useAuth();
  return (
    <div>
      <nav className="nav-bar"> 
        <div className="nav-bar-left" >
        <NavLink to={ROUTES.HOME}
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >Home</NavLink>
        <NavLink to={ROUTES.PRODUCTS}
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >Products</NavLink>
        </div>
        {!user ? (
          <>
            <div className="nav-bar-right">
            <NavLink to={ROUTES.LOGIN}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >Login</NavLink>
            <NavLink to={ROUTES.REGISTRATIONS}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >Register</NavLink>
            </div>
          
          </>
        ) : (
          <>
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
            <NavLink to={ROUTES.CART} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} > Cart </NavLink>
            <NavLink to={ROUTES.ACCOUNT} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} > My Account</NavLink>
          </>
        )}
      </nav>
      <main>
         <Outlet />
        
        </main>  
     <Footer />
    </div>
    
  );
}

export default Root;
