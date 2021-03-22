import React from "react";
import { Link } from "react-router-dom";
import { KeysType } from "../pages/Explorer";

type KeysetListProps = {
  keyset: KeysType;
  repoName: string;
};

const KeysetList = ({ keyset, repoName }: KeysetListProps) => {
  if (!keyset || keyset.length === 0) {
    return <div>No keysets found in {repoName}</div>;
  }
  return (
    <div className={"keyset-list"}>
      {repoName} currently contains {keyset.length} Keyset file
      {keyset.length === 1 ? "" : "s"}. Click one to explore it!
      {keyset.map((key) => (
        <div className={"keyset-list__tile"} key={key.sha}>
          <Link to={`/explorer/${key.path}?sha=${key.sha}`}>
            {getStyledPath(key.path)}
          </Link>
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

export const getStyledPath = (path: string) => {
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
