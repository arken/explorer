import React, { useState } from "react";
import ReactDom from "react-dom";
import "../styles/pdf-viewer.scss";
import { Document, Page } from "react-pdf";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

type PDFViewerProps = {
  open: boolean;
  onClose: () => void;
  url: string;
};

const modalRoot = document.getElementById("portal") as HTMLElement;

const PDFViewer = ({ open, onClose, url }: PDFViewerProps) => {
  const [currPage, setCurrPage] = useState(0);
  const [numPages, setNumPages] = useState<number | undefined>(undefined);
  const validatedPageChange = (desired: number) => {
    if (numPages && desired >= 0 && desired < numPages) setCurrPage(desired);
  };
  if (open) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    return ReactDom.createPortal(
      <>
        <div className={"modal-overlay"} onClick={onClose} />
        <div className={"modal-dialog"}>
          <div className={"modal-body"}>
            <MdNavigateBefore
              className={currPage <= 0 ? "unavailable" : undefined}
              onClick={() => validatedPageChange(currPage - 1)}
            />
            <div className={"doc-column"}>
              <Document
                file={url}
                loading={""}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                <Page
                  className={"content"}
                  pageIndex={Math.max(0, currPage)}
                  height={700}
                />
              </Document>
              {numPages && (
                <span>
                  {currPage + 1}/{numPages}
                </span>
              )}
            </div>
            <MdNavigateNext
              className={
                numPages && currPage + 1 >= numPages ? "unavailable" : undefined
              }
              onClick={() => validatedPageChange(currPage + 1)}
            />
          </div>
        </div>
      </>,
      modalRoot
    );
  } else {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    return null;
  }
};

export default PDFViewer;
