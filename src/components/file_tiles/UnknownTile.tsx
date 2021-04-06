import React from "react";
import { FileTileProps } from "./file_util";
import NewTabLink from "../NewTabLink";

const UnknownTile = ({ ipfsHash, name }: FileTileProps) => {
  const url = `https://link.arken.io/ipfs/${ipfsHash}`;
  return (
    <div className={"file-tile file-tile--unknown"}>
      <div className={"content-container"}>
        <span className={"content"}>
          This file's format is unsupported, but you can still see it by
          clicking the filename below
        </span>
      </div>
      <NewTabLink className={"file-tile__filename"} href={url}>
        {name}
      </NewTabLink>
    </div>
  );
};

export default UnknownTile;
