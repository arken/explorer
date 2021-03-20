import React, { useState } from "react";
import { FileTileProps } from "./file_util";
import "../../styles/file_tiles.scss";

const ImageTile = ({ ipfsHash, name }: FileTileProps) => {
  const url = `https://link.arken.io/ipfs/${ipfsHash}`;
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={"file-tile file-tile--img"}>
      <div className={`img-container${loaded ? "" : " loading"}`}>
        <img src={url} alt={name} onLoad={() => setLoaded(true)} />
      </div>
      {loaded && (
        <a
          className={"file-tile__filename"}
          href={url}
          target={"_blank"}
          rel={"noreferrer"}
        >
          {name}
        </a>
      )}
    </div>
  );
};

export default ImageTile;
