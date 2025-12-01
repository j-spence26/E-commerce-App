import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom"
import Root, { ROUTES } from "./components/root/root";
import { products } from "./containers/productsPage";
import  Register from "./containers/registrationPage";
import { useState } from 'react';
import Login from "./containers/loginPage";
import HomePage from "./containers/homePage";
import { AuthProvider } from "./components/auth/AuthContext";

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> }>
      <Route index element={ <HomePage /> }/>
      <Route path={ROUTES.REGISTRATIONS} element={ <Register  /> }  />
       <Route path={ROUTES.LOGIN} element={ <Login  /> }  />
      <Route path={ROUTES.PRODUCTS} element={ <productsPage  />  }  />
      <Route path={ROUTES.HOME}  element={ <HomePage /> } />
    </Route>
  ));
  
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>


  );
}

export default App;
