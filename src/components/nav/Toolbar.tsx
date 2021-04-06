import React from "react";
import { Link } from "react-router-dom";
import "../../styles/toolbar.scss";
import NavItems from "./NavItems";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../../styles/img/logo.svg";

type NavProps = {
  handleFn: (value: boolean) => void;
};

const Toolbar = (props: NavProps) => (
  <header className={"toolbar"}>
    <nav className={"toolbar-nav"}>
      <div onClick={() => props.handleFn(true)} className={"toolbar-burger"}>
        <button className={"toggle-button"}>
          <AiOutlineMenu className={"icon"} />
        </button>
      </div>
      <div className={"toolbar-nav-logo"}>
        <Link to={"/"}>
          <img id={"logo"} src={logo} alt={"logo"} />
        </Link>
      </div>
      <div className={"spacer"} />
      <div className={"toolbar-nav-items"}>
        <NavItems />
      </div>
    </nav>
  </header>
);

export default Toolbar;
