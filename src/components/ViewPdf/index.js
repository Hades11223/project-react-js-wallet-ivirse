import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import LoadingIndicator from "../../layouts/LoadingIndicator";
import { ViewPdfWrapper } from "./styled";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewPdf = ({ pdf, hasSpace }) => {
  const getScaleByWindowSize = () => {
    let bool = window.matchMedia("(max-width: 1280px)");

    return bool ? 2 : 3;
  };
  const [data, setData] = useState({
    numPages: null,
    numPages: 1,
    loading: true,
    scale: getScaleByWindowSize(),
  });

  const onDocumentLoadSuccess = (dataPdf) => {
    const { numPages } = dataPdf;
    setData({ ...data, numPages, loading: false });
  };
  return (
    <ViewPdfWrapper loading={data?.loading?.toString()} hasSpace>
      {data?.loading && <LoadingIndicator />}
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(data?.numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            scale={data.scale}
          />
        ))}
      </Document>
    </ViewPdfWrapper>
  );
};

export default ViewPdf;
