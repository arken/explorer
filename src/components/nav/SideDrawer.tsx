import React from "react";
import "../../styles/side_drawer.scss";
import NavItems from "./NavItems";

type SideDrawerProps = {
  open: boolean;
};

export default function SideDrawer({ open }: SideDrawerProps) {
  const classes = open ? "side-drawer open" : "side-drawer";
  if (open) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }
  return (
    <nav className={classes}>
      <NavItems />
    </nav>
  );
}
