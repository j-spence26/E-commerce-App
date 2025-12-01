import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const ROUTES = {
  REGISTRATIONS: "/registrationPage",
  APPOINTMENTS: "/productsPage",
  LOGIN: "/loginPage",
  HOME: "/homePage",
};

function Root() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav> 
        <NavLink to={ROUTES.HOME}>Home</NavLink>
        <NavLink to={ROUTES.APPOINTMENTS}>Products</NavLink>

        {!user ? (
          <>
            <NavLink to={ROUTES.LOGIN}>Login</NavLink>
            <NavLink to={ROUTES.REGISTRATIONS}>Register</NavLink>
        
          </>
        ) : (
          <button onClick={logout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        )}
      </nav>

      <Outlet />
    </div>
  );
}

export default Root;
