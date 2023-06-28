import {useEffect, useState} from "react";
import {Document, Page, pdfjs} from "react-pdf";
import {Button} from "antd";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const PDFViewer = ({pdf, isBtnsHidden, setIsBtnsHidden }) => {
    pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.6.172/build/pdf.worker.min.js";

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}) {
        setPageNumber(1)
        setNumPages(numPages);
        setIsBtnsHidden("");
    }

    const handleClick = (isPrev: boolean) => {
        if (isPrev && pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
        if (!isPrev && pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    return (
        <div className={"w-full"}>
            <div className='btns flex justify-center gap-5 items-center py-1'
                 style={{ display: isBtnsHidden}}>
                <Button onClick={() => handleClick(true)}>Prev</Button>
                <Button onClick={() => handleClick(false)}>Next</Button>
                <p>{pageNumber} / {numPages}</p>
            </div>
            <div className='pdf-container'
                 style={{height: 700, overflow: "auto"}}>
                {pdf && (
                    <Document file={pdf}
                              onLoadSuccess={onDocumentLoadSuccess}>
                        <Page
                            pageNumber={pageNumber}

                            renderAnnotationLayer={false}
                        />
                    </Document>
                )}
            </div>
            <div className='text'></div>
        </div>
    );
};

export default PDFViewer

