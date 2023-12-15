import React from "react";
import NavBar from "../NavBar";

const LayoutNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main className="p-5">{children}</main>
    </>
  );
};

export default LayoutNav;
