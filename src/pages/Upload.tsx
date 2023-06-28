import {Button, Upload as UploadFiles} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import * as PDFJS from "pdfjs-dist";
import PDFPreview from "../components/PDFPreview.tsx";
import React, { useState} from "react";
import {Summarizer} from "../components/Summarizer.tsx";

interface Files {
    file: File,
    fileList: File[]
}

export const Upload = () => {
    PDFJS.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3/build/pdf.worker.min.js";
    const [isBtnsHidden, setIsBtnsHidden]:[string, any] = useState("none");
    const [PDF, setPDF]: [File | null, any] = useState(null);
    const [pdfStr, setPdfStr]: [string, React.Dispatch<string>] = useState("");
    const onFileUploaded = (file: Files) => {
        if (!file.file) return;
        const reader = new FileReader();
        const pdfFile = file.file

        setPDF(pdfFile);

        reader.onload = async (e) => {
            const pdf = await PDFJS.getDocument(e.target.result).promise;
            // pass pdf to PDFPreview
            const maxPages = pdf.numPages;
            const pageTextPromises = [];
            for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
                pageTextPromises.push(getPageText(pdf, pageNo));
            }
            const pageTexts = await Promise.all(pageTextPromises);
            // important: 获得所有页的文本
            setPdfStr(pageTexts.join(" "));
        };

        reader.readAsArrayBuffer(file.file);
    };

    const getPageText = async (pdf: any, pageNo: number) => {
        const page = await pdf.getPage(pageNo);
        const tokenizedText = await page.getTextContent();
        const pageText = tokenizedText.items.map(token => token.str).join("");
        return pageText;
    };

    return (
        <>
            <UploadFiles
                onChange={onFileUploaded}
                maxCount={1}
                beforeUpload={() => false}
                showUploadList={false}
            >
                <Button icon={<UploadOutlined/>}>Click to Upload</Button>
            </UploadFiles>
            <div className='w-full flex flex-nowrap'>
                <PDFPreview
                    pdf={PDF}
                    isBtnsHidden={isBtnsHidden}
                    setIsBtnsHidden={setIsBtnsHidden}
                />
                <Summarizer pdfStr={pdfStr} />
            </div>
        </>
    );
};
