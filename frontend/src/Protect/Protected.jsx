import React from 'react'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Protected = ({ children }) => {

  const token = Cookies.get("token"); // your auth cookie name
  console.log(token);

  return token ? children : <Navigate to={'/'} />;
}
export default Protected;