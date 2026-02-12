import { useState } from "react";
import { Card, Input, Button, Typography, Tag } from "antd";
import { translateText } from "../api";

const { Title } = Typography;
const { TextArea } = Input;

function TranslatorCard() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [engine, setEngine] = useState("");
    const [loading, setLoading] = useState(false);

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
    };

    return (
        <Card
            title="German Translator"
            style={{ width: "100%" }}
        >
            {/* 입력 영역 */}
            <Card
                type="inner"
                title="한국어 입력"
                extra={<a href="#">Clear</a>}
            >
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
                <TextArea
                    rows={5}
                    value={output}
                    readOnly
                />

                {engine && (
                    <div style={{ marginTop: 15 }}>
                        사용된 번역 엔진:{" "}
                        <Tag color={engine === "DeepL" ? "blue" : "orange"}>
                            {engine}
                        </Tag>
                    </div>
                )}
            </Card>
        </Card>
    );
}

export default TranslatorCard;
