import React, { useState } from "react";
import { FileTileProps, getUrl } from "./file_util";
import { pdfjs, Document, Page } from "react-pdf";
import NewTabLink from "../NewTabLink";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFTile = ({ ipfsHash, name }: FileTileProps) => {
  const [loaded, setLoaded] = useState(false);
  const url = getUrl(ipfsHash);
  return (
    <div className={"file-tile file-tile--pdf"}>
      <div className={`content-container${loaded ? "" : " loading"}`}>
        <Document
          file={url}
          loading={""}
          onLoadSuccess={() => {
            setLoaded(true);
          }}
        >
          <Page className={"content"} pageIndex={0} height={350} />
        </Document>
      </div>
      <NewTabLink className={"file-tile__filename"} href={url}>
        {name}
      </NewTabLink>
    </div>
  );
};

export default PDFTile;
