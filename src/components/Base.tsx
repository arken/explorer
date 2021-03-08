import React, { useState } from "react";
import Toolbar from "./nav/Toolbar";
import SideDrawer from "./nav/SideDrawer";

type BaseProps = {
  children: React.ReactNode;
  pageName: string;
};

const Base = ({ children, pageName }: BaseProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div id={pageName + "-page"} className={"page-div"}>
      <Toolbar handleFn={setMenuOpen} />
      <SideDrawer open={menuOpen} />
      {menuOpen && (
        <div className={"backdrop"} onClick={() => setMenuOpen(false)} />
      )}
      <main>{children}</main>
    </div>
  );
};

export default Base;
