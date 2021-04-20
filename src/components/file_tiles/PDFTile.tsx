import React, { useEffect, useState } from "react";
import { FileTileProps, getUrl } from "./file_util";
import { pdfjs, Document, Page } from "react-pdf";
import NewTabLink from "../NewTabLink";
import PDFViewer from "../PDFViewer";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFTile = ({ ipfsHash, name }: FileTileProps) => {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<Uint8Array | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const url = getUrl(ipfsHash);
  useEffect(() => {
    fetch(url)
      .then((res) =>
        res.arrayBuffer().then((buf) => {
          setData(new Uint8Array(buf));
        })
      )
      .catch(() => {
        //what to do here?
      });
  }, [setData, url]);
  return (
    <div className={"file-tile file-tile--pdf"}>
      {data && (
        <PDFViewer
          data={data}
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          url={url}
        />
      )}
      <div
        className={`content-container${loaded ? "" : " loading"}`}
        onClick={() => {
          if (loaded) setPreviewOpen(true);
        }}
      >
        {data && (
          <Document
            file={{ data: data }}
            externalLinkTarget={"_blank"}
            loading={""}
            onLoadSuccess={() => {
              setLoaded(true);
            }}
          >
            <Page className={"content"} pageIndex={0} height={350} />
          </Document>
        )}
      </div>
      <NewTabLink className={"file-tile__filename"} href={url}>
        {name}
      </NewTabLink>
    </div>
  );
};

export default PDFTile;
