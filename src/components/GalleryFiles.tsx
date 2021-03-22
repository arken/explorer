import React, { useState } from "react";
import { FileCategory, getFileCategory } from "./file_tiles/file_util";
import ImageTile from "./file_tiles/ImageTile";
import UnknownTile from "./file_tiles/UnknownTile";
import { ButtonPrimary } from "slate-react-system";
import PDFTile from "./file_tiles/PDFTile";
import TextTile from "./file_tiles/TextTile";

type GalleryFilesProps = {
  keyset: Array<Array<string>>;
};

const PAGE_SIZE = 16;

const GalleryFiles = ({ keyset }: GalleryFilesProps) => {
  const [numShown, setNumShown] = useState(Math.min(keyset.length, PAGE_SIZE));
  const displayed = keyset.slice(0, numShown); //not performant because it copies
  return (
    <>
      <div className={"file-tiles"}>
        {displayed.map(([hash, name]) => {
          switch (getFileCategory(name)) {
            case FileCategory.IMAGE:
              return <ImageTile ipfsHash={hash} name={name} key={hash} />;
            case FileCategory.PDF:
              return <PDFTile ipfsHash={hash} name={name} key={hash} />;
            case FileCategory.TEXT:
              return <TextTile ipfsHash={hash} name={name} key={hash} />;
            default:
              return <UnknownTile ipfsHash={hash} name={name} key={hash} />;
          }
        })}
      </div>
      <div className={"button-row"}>
        {numShown < keyset.length ? (
          <ButtonPrimary
            onClick={() => {
              setNumShown((prev) => prev + PAGE_SIZE);
            }}
          >
            Load more ({numShown}/{keyset.length})
          </ButtonPrimary>
        ) : (
          `That's all there is in here`
        )}
      </div>
    </>
  );
};

export default GalleryFiles;
