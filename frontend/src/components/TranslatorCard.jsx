import { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Tag,
    Space,
    message,
} from "antd";

import {
    SoundOutlined,
    CopyOutlined,
    SaveOutlined,
} from "@ant-design/icons";

import { translateText } from "../api";
import { saveTranslation } from "../api";

const { Title } = Typography;
const { TextArea } = Input;

function TranslatorCard() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [engine, setEngine] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    // 🔹 번역 실행
    const handleTranslate = async () => {
        if (!input.trim()) return;

        setLoading(true);
        try {
            const res = await translateText(input);
            setOutput(res.result);
            setEngine(res.engine);
        } catch {
            setOutput("번역 중 오류 발생");
            setEngine("");
        }
        setLoading(false);
        setSaved(false);
    };

    // 🔹 독일어 음성 읽기
    const speakGerman = () => {
        if (!output) return;

        const utterance = new SpeechSynthesisUtterance(output);
        utterance.lang = "de-DE";
        utterance.rate = 0.9;
        utterance.pitch = 1;

        window.speechSynthesis.speak(utterance);
    };

    // 🔹 복사 기능
    const copyToClipboard = async () => {
        if (!output) return;

        try {
            await navigator.clipboard.writeText(output);
            message.success("복사 완료");
        } catch {
            message.error("복사 실패");
        }
    };

    // 🔹 음성 인식
    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            message.error("이 브라우저는 음성 인식을 지원하지 않습니다.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "de-DE";
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const speechText = event.results[0][0].transcript;
            message.success("인식된 문장: " + speechText);
        };

        recognition.start();
    };

    const handleSave = async () => {
        if (!output || saved) return;

        await saveTranslation({
            source_text: input,
            translated_text: output,
            engine: engine,
        });

        message.success("저장 완료");
        setSaved(true);
    };

    return (
        <Card title="독일어 번역기" style={{ width: "100%" }}>

            {/* 입력 영역 */}
            <Card type="inner" title="한국어 입력">
                <TextArea
                    rows={5}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="한국어를 입력하세요"
                />
            </Card>

            {/* 번역 버튼 */}
            <div style={{ textAlign: "center", margin: "20px 0" }}>
                <Button
                    type="primary"
                    onClick={handleTranslate}
                    loading={loading}
                >
                    번역
                </Button>
            </div>

            {/* 결과 영역 */}
            <Card
                type="inner"
                title="독일어 번역 결과"
                style={{ marginTop: 16 }}
            >
                <TextArea rows={5} value={output} readOnly />

                {engine && (
                    <div style={{ marginTop: 15 }}>
                        사용된 번역 엔진:{" "}
                        <Tag color={engine === "DeepL" ? "blue" : "orange"}>
                            {engine}
                        </Tag>
                    </div>
                )}

                {/* 버튼 영역 */}
                <div style={{ marginTop: 20 }}>
                    <Space wrap>
                        <Button
                            icon={<SoundOutlined />}
                            onClick={speakGerman}
                        >
                        </Button>

                        {/* <Button onClick={startListening}>
                            🎤 말하기
                        </Button> */}

                        <Button
                            icon={<CopyOutlined />}
                            onClick={copyToClipboard}
                        >
                        </Button>

                        <Button
                            icon={<SaveOutlined />}
                            type={saved ? "default" : "primary"}
                            disabled={saved}
                            onClick={handleSave}
                        >

                        </Button>
                    </Space>
                </div>

            </Card>
        </Card>
    );
}

export default TranslatorCard;
