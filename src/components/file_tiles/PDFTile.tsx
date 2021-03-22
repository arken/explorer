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
      <Document
        file={url}
        loading={`Loading ${name}...`}
        onLoadSuccess={() => {
          setLoaded(true);
        }}
      >
        <div className={"content-container"}>
          <Page pageIndex={0} height={350} />
        </div>
      </Document>
      {loaded && (
        <NewTabLink className={"file-tile__filename"} href={url}>
          {name}
        </NewTabLink>
      )}
    </div>
  );
};

export default PDFTile;
