import {useEffect, useState} from "react";
import {Button, message} from "antd";
import {getTurbo} from "../api/turbo.ts";

export const Summarizer = ({pdfStr}) => {
    const [max_tokens, setMax_tokens] = useState(100);
    const [messageApi, contextHolder] = message.useMessage();
    const [messages, setMessages] = useState([]); // multiple conversations
    const [summarizedMessages, setSummarizedMessages] = useState([]); // single conversation
    const [conversations, setConversations] = useState([{role: "user", content: prompt}]);

    const useGPT = async () => {
        let prompt = `please summarize the following paper precisely in mandarin, if the structure contains introduction, main parts, conclusion that similar to academic paper, then please follow the structure to summarize in each section: ${pdfStr}`.slice(0, 4000 * 3 - max_tokens) ;
        // 去掉字符串最右边references之后的部分
        prompt = prompt.slice(0, prompt.lastIndexOf("references"));
        console.log(prompt, prompt.length)
        setConversations([{role: "user", content: prompt}])
        const res = await getTurbo(max_tokens, conversations);
        if (res.data.error_code) {
            console.log(res);
            messageApi.error(res);
            setSummarizedMessages([...summarizedMessages,res.data.msg])
            return;
        } else {
            messageApi.success("success");
            setSummarizedMessages([res.data.data.message])
            setMessages([summarizedMessages, ...messages])
        }

    }

    useEffect(() => {
        console.log(pdfStr)
        setConversations([{role: "user", content: pdfStr}])
    }, [pdfStr]);

    return pdfStr && (
        <div>
            <Button onClick={useGPT}>Summarize with GPT</Button>
            <div>{summarizedMessages && summarizedMessages.map((summarizedMessage) => (
                <div className={"whitespace-pre-line"}>
                    <p>{summarizedMessage}</p>
                </div>
            ))}
            </div>
        </div>
    )
}
