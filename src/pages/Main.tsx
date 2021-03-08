import React from "react";
import { ButtonPrimary } from "slate-react-system";
import Base from "../components/Base";

export const Main = () => (
  <Base pageName={"main"}>
    <div>
      <h1>Arken Explorer</h1>
      Hello world!
      <br />
      <ButtonPrimary>Hi</ButtonPrimary>
    </div>
  </Base>
);

export default Main;
