import React, { useEffect, useState } from "react";
import { ButtonPrimary } from "slate-react-system";
import Base from "../components/Base";

export const Main = () => {
  let [name, setName] = useState("...");
  useEffect(() => {
    fetch("https://api.github.com/repos/arken/explorer").then((res) => {
      res.json().then((json) => setName(" " + json.name));
    });
  }, [name]);

  return (
    <Base pageName={"main"}>
      <div>
        <h1>Arken Explorer</h1>
        Hello world! My repo's name is<code>{name}</code>
        <br />
        <ButtonPrimary>Hi</ButtonPrimary>
      </div>
    </Base>
  );
};

export default Main;
