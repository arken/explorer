import React from "react";
import { FileTileProps } from "./file_util";
import NewTabLink from "../NewTabLink";

const UnknownTile = ({ ipfsHash, name }: FileTileProps) => (
  <div className={"file-tile file-tile--unknown"}>
    <div className={"content-container"}>
      {name}'s file format is unsupported, but you can still see it{" "}
      <NewTabLink href={`https://link.arken.io/ipfs/${ipfsHash}`}>
        here
      </NewTabLink>
    </div>
  </div>
);

export default UnknownTile;
