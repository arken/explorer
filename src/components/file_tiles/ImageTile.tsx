import React, { useEffect, useState } from "react";
import {
  fetchData,
  FileTileProps,
  getFileExtension,
  getUrl,
} from "./file_util";
import "../../styles/file_tiles.scss";
import NewTabLink from "../NewTabLink";

const ImageTile = ({ ipfsHash, name }: FileTileProps) => {
  const url = getUrl(ipfsHash);
  const [data, setData] = useState<Blob | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetchData(url, "Blob").then((data) => {
      if (data instanceof Blob) {
        setData(data);
      }
    });
  }, [url, setData, name]);
  let imgUrl: string;
  if (data) {
    const urlCreator = window.URL || window.webkitURL;
    imgUrl = urlCreator.createObjectURL(data);
  }
  return (
    <div className={"file-tile file-tile--img"}>
      <div className={`content-container${loaded ? "" : " loading"}`}>
        {data && (
          <img
            src={imgUrl!}
            alt={name}
            onLoad={() => setLoaded(true)}
            className={"content"}
          />
        )}
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
