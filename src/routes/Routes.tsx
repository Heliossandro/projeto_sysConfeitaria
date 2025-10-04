import { Routes, Route } from "react-router-dom";
import { Layout } from "../layout";
import { Login } from "../pages/login/Login";
import {Create_Account} from "../pages/create_account/Create_account"
import { Home } from "../pages/home/Home";
import { Config } from "../pages/config/Config";
import { Shop } from "../pages/shop/Shop"; 
import { AddItem } from "../pages/addItem/AddItem";
import { Menu } from "../pages/menu/Menu";
import { Client } from "../pages/client/Client";
import { Cart } from "../pages/cart/Cart";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/create-account" element={<Create_Account/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/config" element={<Config/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/add-item" element={<AddItem/>}/>
      <Route path="/menu" element={<Menu/>}/>
      <Route path="/client" element={<Client/>}/>
      <Route path="/cart" element={<Cart/>}/>
    </Routes>
  );
};
