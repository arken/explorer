import React from "react";
import { KeysType } from "../pages/Explorer";

type KeysetListProps = {
  keysets: KeysType;
  repoName: string;
};

const KeysetList = ({ keysets, repoName }: KeysetListProps) => {
  if (!keysets || keysets.length === 0) {
    return <div>No keysets found in {repoName}</div>;
  }
  return (
    <div className={"keyset-list"}>
      {repoName} currently contains {keysets.length} Keyset file
      {keysets.length === 1 ? "" : "s"}. Click one to explore it!
      {keysets.map((key) => (
        <div className={"keyset-list__tile"} key={key.sha}>
          {getStyledPath(key.path)}
          <span>
            <a href={key.html_url} target={"_blank"} rel="noreferrer">
              See it on GitHub
            </a>
          </span>
        </div>
      ))}
    </div>
  );
};

const getStyledPath = (path: string) => {
  const index = path.lastIndexOf("/") + 1;
  if (index > 0)
    return (
      <span>
        <span style={{ opacity: "0.5" }}>{path.substring(0, index)}</span>
        <strong>{path.substring(index)}</strong>
      </span>
    );
  return <span>{path}</span>;
};

export default KeysetList;
