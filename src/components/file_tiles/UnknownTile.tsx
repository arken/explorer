import React from "react";
import { FileTileProps } from "./file_util";

const UnknownTile = ({ ipfsHash, name }: FileTileProps) => (
  <div className={"file-tile file-tile--unknown"}>
    {name} is in a currently unsupported file format. You can still go look
    at/download it{" "}
    <a
      href={`https://link.arken.io/ipfs/${ipfsHash}`}
      target={"_blank"}
      rel={"noreferrer"}
    >
      here
    </a>
  </div>
);

export default UnknownTile;
