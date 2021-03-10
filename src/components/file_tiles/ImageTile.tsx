import React from "react";
import { FileTileProps } from "./file_util";
import "../../styles/file_tiles.scss";

const ImageTile = ({ ipfsHash, name }: FileTileProps) => {
  return (
    <div className={"file-tile file-tile--img"}>
      <img src={`https://link.arken.io/ipfs/${ipfsHash}`} alt={name} />
    </div>
  );
};

export default ImageTile;
