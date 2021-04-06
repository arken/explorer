import React, { useState } from "react";
import { FileTileProps, getUrl } from "./file_util";
import "../../styles/file_tiles.scss";
import NewTabLink from "../NewTabLink";

const ImageTile = ({ ipfsHash, name }: FileTileProps) => {
  const url = getUrl(ipfsHash);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={"file-tile file-tile--img"}>
      <div className={`content-container${loaded ? "" : " loading"}`}>
        <img
          src={url}
          alt={name}
          onLoad={() => setLoaded(true)}
          className={"content"}
        />
      </div>
      {loaded && (
        <NewTabLink className={"file-tile__filename"} href={url}>
          {name}
        </NewTabLink>
      )}
    </div>
  );
};

export default ImageTile;
