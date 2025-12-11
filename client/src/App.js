import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import Root, { ROUTES } from "./components/root/root";
import Products  from "./components//products/products";
import ProductPage from "./containers/productsPage";
import  Register from "./containers/registrationPage";
import Login from "./containers/loginPage";
import HomePage from "./containers/homePage";
import { AuthProvider } from "./components/auth/AuthContext";
import Account from "./containers/accountPage";
import { CartProvider } from "./components/cart/cartContext";
import Cart from "./containers/cartPage";
import './styles/App.css';
import About from "./containers/aboutPage";
import Contact from "./containers/contactPage";
import PrivacyPolicy from "./containers/privacyPolicyPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Sd8XaGlkF6WTlVWIldiwdPxR7q6WZtjkHLrJnIpQpLqQSi0ZA0aqKINcZ6OW80a8hwfgQPBE1WT0DeNiyKreChC00qJJgojbT");

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> }>
      <Route index element={ <HomePage /> }/>
      <Route path={ROUTES.REGISTRATIONS} element={ <Register  /> }  />
       <Route path={ROUTES.LOGIN} element={ <Login  /> }  />
      <Route path={ROUTES.PRODUCTS} element={ <Products  />  }  />
      <Route path={`${ROUTES.PRODUCTS}/:id`} element={<ProductPage /> } />
      <Route path={ROUTES.HOME}  element={ <HomePage /> } />
      <Route path={ROUTES.ACCOUNT} element={ <Account /> } ></Route>
      <Route path={ROUTES.CART} element={ <Cart />} ></Route>
      <Route path={ROUTES.ABOUT} element={<About/>} > </Route>
      <Route path={ROUTES.CONTACT} element={ <Contact />}  ></Route>
      <Route path={ROUTES.PRIVACY} element={ <PrivacyPolicy /> } ></Route>
    </Route>
  ));
  
  return (      
  <Elements stripe={stripePromise} >
    <AuthProvider>
          <CartProvider>
            <RouterProvider router={router}/>
          </CartProvider>
    </AuthProvider>
  </Elements>
  );
}

export default App;
