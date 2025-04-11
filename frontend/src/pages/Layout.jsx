import React from "react";
import MyNav from "../components/MyNav";
import MyFooter from "../components/MyFooter";
import { Outlet } from "react-router";

export default function Layout({ cartCount }) {
  return (
    <>
      <MyNav  />
      <Outlet />
      <MyFooter />
    </>
  );
}