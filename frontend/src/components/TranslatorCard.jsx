import { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Tag,
    Space,
    Select,
    Row,
    Col,
} from "antd";
import {
    SoundOutlined,
    CopyOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import { translateText, saveTranslation } from "../api";

const { TextArea } = Input;
const { Option } = Select;

function TranslatorCard() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]); // 🔥 결과 배열로 변경
    const [loading, setLoading] = useState(false);

    const [selectedLangs, setSelectedLangs] = useState(["DE"]); // 복수 선택
    const [confirmedLangs, setConfirmedLangs] = useState(["DE"]); // 선택 완료 후 고정

    const languageMap = {
        DE: "독일어",
        FR: "프랑스어",
        ES: "스페인어",
        JA: "일본어",
    };

    // 선택 완료 버튼
    const handleConfirmSelection = () => {
        if (selectedLangs.length === 0) return;
        setConfirmedLangs(selectedLangs);
        setResults([]);
    };

    const handleTranslate = async () => {
        if (!input.trim()) return;

        setLoading(true);

        try {
            const promises = confirmedLangs.map(async (lang) => {
                // 1차 번역
                const res = await translateText(input, lang);

                // 2차 재번역 (한국어로)
                const backRes = await translateText(res.result, "KO");

                return {
                    lang,
                    text: res.result,
                    backText: backRes.result,   // ✅ 추가
                    engine: res.engine,
                    saved: false,
                };
            });

            const data = await Promise.all(promises);
            setResults(data);
        } catch {
            setResults([]);
        }

        setLoading(false);
    };

    const handleSave = async (index) => {
        const item = results[index];
        if (item.saved) return;

        await saveTranslation({
            source_text: input,
            translated_text: item.text,
            engine: item.engine,
            target_lang: item.lang,
        });

        const updated = [...results];
        updated[index].saved = true;
        setResults(updated);
    };

    const speakText = (text, lang) => {
        const utterance = new SpeechSynthesisUtterance(text);

        if (lang === "DE") utterance.lang = "de-DE";
        if (lang === "FR") utterance.lang = "fr-FR";
        if (lang === "ES") utterance.lang = "es-ES";
        if (lang === "JA") utterance.lang = "ja-JP";

        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const copyToClipboard = async (text) => {
        await navigator.clipboard.writeText(text);
    };

    return (
        <Card
            title="번역기"
            extra={
                <Space>
                    <Select
                        mode="multiple"
                        maxTagCount={2}
                        value={selectedLangs}
                        onChange={(value) => {
                            if (value.length <= 2) {
                                setSelectedLangs(value);
                            }
                        }}
                        style={{
                            minWidth: 200,
                            width: "auto",
                        }}
                        styles={{
                            selector: {
                                flexWrap: "nowrap",
                                whiteSpace: "nowrap",
                                overflowX: "auto",
                            },
                        }}
                    >
                        <Option value="DE">독일어</Option>
                        <Option value="FR">프랑스어</Option>
                        <Option value="ES">스페인어</Option>
                        <Option value="JA">일본어</Option>
                    </Select>

                    <Button onClick={handleConfirmSelection}>
                        선택 완료
                    </Button>
                </Space>
            }
        >
            {/* 한국어 입력 */}
            <Card type="inner" title="한국어 입력">
                <TextArea
                    rows={4}
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

            {/* 번역 결과 */}
            {confirmedLangs.length === 1 && (
                <Card
                    type="inner"
                    title={`${languageMap[confirmedLangs[0]]} 번역 결과`}
                >
                    <TextArea
                        rows={4}
                        value={results[0]?.text || ""}
                        readOnly
                    />
                    {results[0]?.backText && (
                        <>
                            <div style={{ marginTop: 10, fontWeight: "bold" }}>
                                한국어 재번역
                            </div>
                            <TextArea
                                rows={3}
                                value={results[0].backText}
                                readOnly
                            />
                        </>
                    )}

                    <div style={{ marginTop: 15 }}>
                        <Space>
                            <Button
                                icon={<SoundOutlined />}
                                onClick={() =>
                                    results[0] &&
                                    speakText(results[0].text, results[0].lang)
                                }
                            >
                                음성 듣기
                            </Button>

                            <Button
                                icon={<CopyOutlined />}
                                onClick={() =>
                                    results[0] &&
                                    copyToClipboard(results[0].text)
                                }
                            >
                                복사하기
                            </Button>

                            <Button
                                icon={<SaveOutlined />}
                                type={results[0]?.saved ? "default" : "primary"}
                                disabled={!results[0] || results[0]?.saved}
                                onClick={() => results[0] && handleSave(0)}
                            >
                                저장하기
                            </Button>
                        </Space>
                    </div>

                    {results[0] && (
                        <Tag color="blue" style={{ marginTop: 10 }}>
                            {results[0].engine}
                        </Tag>
                    )}
                </Card>
            )}

            {/* 두 개 선택 시 */}
            {confirmedLangs.length === 2 && (
                <Row gutter={16}>
                    {confirmedLangs.map((lang, index) => {
                        const item = results[index];

                        return (
                            <Col span={12} key={lang}>
                                <Card
                                    type="inner"
                                    title={`${languageMap[lang]} 번역 결과`}
                                >
                                    <TextArea
                                        rows={4}
                                        value={item?.text || ""}
                                        readOnly
                                    />
                                    {item?.backText && (
                                        <>
                                            <div style={{ marginTop: 10, fontWeight: "bold" }}>
                                                한국어 재번역
                                            </div>
                                            <TextArea
                                                rows={3}
                                                value={item.backText}
                                                readOnly
                                            />
                                        </>
                                    )}

                                    <div style={{ marginTop: 15 }}>
                                        <Space>
                                            <Button
                                                icon={<SoundOutlined />}
                                                onClick={() =>
                                                    item &&
                                                    speakText(item.text, item.lang)
                                                }
                                            >
                                                음성 듣기
                                            </Button>

                                            <Button
                                                icon={<CopyOutlined />}
                                                onClick={() =>
                                                    item &&
                                                    copyToClipboard(item.text)
                                                }
                                            >
                                                복사하기
                                            </Button>

                                            <Button
                                                icon={<SaveOutlined />}
                                                type={item?.saved ? "default" : "primary"}
                                                disabled={!item || item?.saved}
                                                onClick={() =>
                                                    item && handleSave(index)
                                                }
                                            >
                                                저장하기
                                            </Button>
                                        </Space>
                                    </div>

                                    {item && (
                                        <Tag color="blue" style={{ marginTop: 10 }}>
                                            {item.engine}
                                        </Tag>
                                    )}
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            )}

        </Card>
    );
}

export default TranslatorCard;