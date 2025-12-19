import { LargeFooter } from "@/app/_Component/Fotter";
import { NavBar } from "@/app/_Component/NavBar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <NavBar></NavBar>
      {children}
      <LargeFooter></LargeFooter>
      hiii
    </div>
  );
};

export default layout;
