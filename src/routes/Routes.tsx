import { Routes, Route } from "react-router-dom";
import { Layout } from "../layout";
import { Login } from "../pages/login/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
};
