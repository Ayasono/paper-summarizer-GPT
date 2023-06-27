import {Button, Upload as UploadFiles} from "antd";
import {UploadOutlined} from "@ant-design/icons";

export const Upload = () => {
    return (
        <>
            <UploadFiles>
                <Button icon={<UploadOutlined/>}>Click to Upload</Button>
            </UploadFiles>
        </>
    )
}
