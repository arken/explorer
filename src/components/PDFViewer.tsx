import React, { useState } from "react";
import ReactDom from "react-dom";
import "../styles/pdf-viewer.scss";
import { Document, Page, pdfjs } from "react-pdf";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { LoaderCircles } from "slate-react-system";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PDFViewerProps = {
  open: boolean;
  onClose: () => void;
  url: string;
  data: Uint8Array | null;
};

const modalRoot = document.getElementById("portal") as HTMLElement;

type CurrPage = {
  index: number;
  width?: number;
  height?: number;
};

const PDFViewer = ({ open, onClose, data }: PDFViewerProps) => {
  const onMyClose = () => {
    setLoaded(false);
    setCurrPage({ index: currPage.index });
    onClose();
  };
  const [currPage, setCurrPage] = useState<CurrPage>({ index: 0 });
  const [loaded, setLoaded] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const validatedPageChange = (desired: number, currPage: CurrPage) => {
    if (loaded) {
      if (desired >= 0 && desired < numPages) {
        setCurrPage({ ...currPage, index: desired });
      } else if (desired === -1) {
        setCurrPage({ ...currPage, index: numPages - 1 });
      } else if (desired === numPages) {
        setCurrPage({ ...currPage, index: 0 });
      }
    }
  };
  if (open) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    return ReactDom.createPortal(
      <>
        <div className={"modal-overlay"} onClick={onMyClose} />
        <div className={"modal-dialog"}>
          <div className={"modal-body"}>
            <div className={"doc-column"}>
              {data && (
                <>
                  <span className={"close-preview"} onClick={onMyClose}>
                    Close
                  </span>
                  <Document
                    file={{ data: data }}
                    externalLinkTarget={"_blank"}
                    loading={""}
                    onLoadSuccess={({ numPages }) => {
                      setNumPages(numPages);
                      setLoaded(true);
                    }}
                  >
                    <Page
                      className={"content"}
                      pageIndex={currPage.index}
                      onLoadSuccess={({ width, height }) => {
                        if (!currPage.width && !currPage.height) {
                          if (width && height) {
                            setCurrPage({
                              index: currPage.index,
                              ...getDocDimensions(width, height),
                            });
                          } else {
                            setCurrPage({
                              width: window.innerWidth * 0.75,
                              height: undefined,
                              index: currPage.index,
                            });
                          }
                        }
                      }}
                      width={currPage.width}
                      height={currPage.height}
                    />
                  </Document>
                </>
              )}
              {loaded ? (
                <div className={"controls-row"}>
                  <MdNavigateBefore
                    className={"page-changer"}
                    onClick={() =>
                      validatedPageChange(currPage.index - 1, currPage)
                    }
                  />
                  <span className={"page-counter"}>
                    {currPage.index + 1}/{numPages}
                  </span>
                  <MdNavigateNext
                    className={"page-changer"}
                    onClick={() =>
                      validatedPageChange(currPage.index + 1, currPage)
                    }
                  />
                </div>
              ) : (
                <div className={"pdf-loader-circles"}>
                  Loading PDF...
                  <LoaderCircles />
                </div>
              )}
            </div>
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

const heightMod = 0.85;
const widthMod = 0.95;

const getDocDimensions = (
  docWidth: number,
  docHeight: number
): { width?: number; height?: number } => {
  const { innerHeight: winHeight, innerWidth: winWidth } = window;
  if (winWidth > winHeight) {
    //widescreen
    const newDocWidth = ((heightMod * winHeight) / docHeight) * docWidth;
    if (newDocWidth < winWidth) {
      return {
        height: heightMod * winHeight,
      };
    } else {
      //scaling the pdf to be heightMod * winHeight pixels tall made it too wide
      //to fit on screen, meaning the document is (potentially very) wide
      return {
        width: widthMod * winWidth,
      };
    }
  } else {
    //tall screen
    const newDocHeight = ((widthMod * winWidth) / docWidth) * docHeight;
    if (newDocHeight < winHeight) {
      return {
        width: widthMod * winWidth,
      };
    } else {
      //scaling th4e pdf made it too wide to display
      return {
        height: heightMod * winHeight,
      };
    }
  }
};

export default PDFViewer;
