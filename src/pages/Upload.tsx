import {Button, Upload as UploadFiles} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import * as PDFJS from "pdfjs-dist";

interface Files {
    file: File,
    fileList: File[]
}

export const Upload = () => {
    PDFJS.GlobalWorkerOptions.workerSrc =
        "https://cdn.jsdelivr.net/npm/pdfjs-dist@3/build/pdf.worker.min.js";
    const onFileUploaded = (file: Files) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const pdf = await PDFJS.getDocument(e.target.result).promise;
            const maxPages = pdf.numPages;
            const pageTextPromises = [];
            for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
                pageTextPromises.push(getPageText(pdf, pageNo));
            }
            const pageTexts = await Promise.all(pageTextPromises);
            console.log(pageTexts.join(" "));
            return pageTexts.join(" ");
        };

        reader.readAsArrayBuffer(file.file);
    }

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
                beforeUpload={() => false}
            >
                <Button icon={<UploadOutlined/>}>Click to Upload</Button>
            </UploadFiles>
        </>
    )
}
