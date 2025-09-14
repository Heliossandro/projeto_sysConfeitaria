import { Routes, Route } from "react-router-dom";
import { Layout } from "../layout";
import { Login } from "../pages/login/Login";
import {Create_Account} from "../pages/create_account/Create_account"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/create_account" element={<Create_Account/>}/>
    </Routes>
  );
};
