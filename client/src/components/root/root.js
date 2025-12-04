import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const ROUTES = {
  REGISTRATIONS: "/registrationPage",
  PRODUCTS: "/products",
  LOGIN: "/loginPage",
  HOME: "/homePage",
  PRODUCT: "/productsPage",
  ACCOUNT: "/accountPage",
  CART: "cartPage",
};

function Root() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav> 
        <NavLink to={ROUTES.HOME}>Home</NavLink>
        <NavLink to={ROUTES.PRODUCTS}>Products</NavLink>
        <NavLink to={ROUTES.CART} > Cart </NavLink>
      

        {!user ? (
          <>
            <NavLink to={ROUTES.LOGIN}>Login</NavLink>
            <NavLink to={ROUTES.REGISTRATIONS}>Register</NavLink>
        
          </>
        ) : (
          <>
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
            <NavLink to={ROUTES.ACCOUNT} > My Account</NavLink>
          </>
        )}
      </nav>

      <Outlet />
    </div>
  );
}

export default Root;
