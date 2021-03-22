import React from "react";
import { FileTileProps } from "./file_util";

const UnknownTile = ({ ipfsHash, name }: FileTileProps) => (
  <div className={"file-tile file-tile--unknown"}>
    <div>
      {name} is in a file format. You can still go look at/download it{" "}
      <a
        href={`https://link.arken.io/ipfs/${ipfsHash}`}
        target={"_blank"}
        rel={"noreferrer"}
      >
        here
      </a>
    </div>
  </div>
);

export default UnknownTile;
