import React, { useState } from "react";
import ReactDom from "react-dom";
import "../styles/pdf-viewer.scss";
import { Document, Page } from "react-pdf";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { LoaderCircles } from "slate-react-system";

type PDFViewerProps = {
  open: boolean;
  onClose: () => void;
  url: string;
};

const modalRoot = document.getElementById("portal") as HTMLElement;

const PDFViewer = ({ open, onClose, url }: PDFViewerProps) => {
  const [currPage, setCurrPage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const validatedPageChange = (desired: number) => {
    if (loaded) {
      if (desired >= 0 && desired < numPages) {
        setCurrPage(desired);
      } else if (desired === -1) {
        setCurrPage(numPages - 1);
      } else if (desired === numPages) {
        setCurrPage(0);
      }
    }
  };
  if (open) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    return ReactDom.createPortal(
      <>
        <div
          className={"modal-overlay"}
          onClick={() => {
            setLoaded(false);
            onClose();
          }}
        />
        <div className={"modal-dialog"}>
          <div className={"modal-body"}>
            {loaded && (
              <MdNavigateBefore
                className={"page-changer"}
                onClick={() => validatedPageChange(currPage - 1)}
              />
            )}
            <div className={"doc-column"}>
              <Document
                file={url}
                externalLinkTarget={"_blank"}
                loading={""}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setLoaded(true);
                }}
              >
                <Page className={"content"} pageIndex={currPage} height={700} />
              </Document>
              {loaded ? (
                <span className={"page-counter"}>
                  {currPage + 1}/{numPages}
                </span>
              ) : (
                <div className={"pdf-loader-circles"}>
                  Loading PDF...
                  <LoaderCircles />
                </div>
              )}
            </div>
            {loaded && (
              <MdNavigateNext
                className={"page-changer"}
                onClick={() => validatedPageChange(currPage + 1)}
              />
            )}
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
