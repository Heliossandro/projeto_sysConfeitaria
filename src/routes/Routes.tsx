import { Routes, Route } from "react-router-dom";
import { Layout } from "../layout";
import { Login } from "../pages/login/Login";
import {Create_Account} from "../pages/create_account/Create_account"
import { Home } from "../pages/home/Home";
import { Config } from "../pages/config/Config";
import { Shop } from "../pages/shop/Shop"; 

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/create-account" element={<Create_Account/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/config" element={<Config/>}/>
      <Route path="/shop" element={<Shop/>}/>
    </Routes>
  );
};
