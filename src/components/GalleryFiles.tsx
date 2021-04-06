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
  const displayed: Array<React.ReactNode> = [];
  for (let i = 0; i < numShown; i++) {
    const [hash, name] = keyset[i];
    switch (getFileCategory(name)) {
      case FileCategory.IMAGE:
        displayed.push(<ImageTile ipfsHash={hash} name={name} key={hash} />);
        break;
      case FileCategory.PDF:
        displayed.push(<PDFTile ipfsHash={hash} name={name} key={hash} />);
        break;
      case FileCategory.TEXT:
        displayed.push(<TextTile ipfsHash={hash} name={name} key={hash} />);
        break;
      default:
        displayed.push(<UnknownTile ipfsHash={hash} name={name} key={hash} />);
        break;
    }
  }

  return (
    <>
      <div className={`file-tiles ${displayed.length < 3 ? " few" : ""}`}>
        {displayed}
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
          "That's all there is in here."
        )}
      </div>
    </>
  );
};

export default GalleryFiles;
