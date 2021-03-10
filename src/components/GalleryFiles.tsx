import React, { useState } from "react";
import { FileCategory, getFileCategory } from "./file_tiles/file_util";
import ImageTile from "./file_tiles/ImageTile";
import UnknownTile from "./file_tiles/UnknownTile";

type GalleryFilesProps = {
  keyset: Array<Array<string>>;
};

const PAGE_SIZE = 10;

const GalleryFiles = ({ keyset }: GalleryFilesProps) => {
  const [displayed, setDisplayed] = useState(
    keyset.slice(0, Math.min(keyset.length, PAGE_SIZE))
  ); //not performant because it copies
  console.log(displayed);
  return (
    <div className={"file-tiles"}>
      {displayed.map(([hash, name]) => {
        switch (getFileCategory(name)) {
          case FileCategory.IMAGE:
            return <ImageTile ipfsHash={hash} name={name} />;
          default:
            return <UnknownTile ipfsHash={hash} name={name} />;
        }
      })}
    </div>
  );
};

export default GalleryFiles;
