import { useEffect, useState } from "react";
import { Card, Button, Tag, Empty, Space } from "antd";
import {
    DeleteOutlined,
    SoundOutlined,
} from "@ant-design/icons";
import { getHistory, deleteHistory } from "../api";

function HistoryPanel() {
    const [data, setData] = useState([]);
    const [revealed, setRevealed] = useState({});

    const fetchData = async () => {
        const res = await getHistory();
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteHistory(id);
        fetchData();
    };

    // 🔊 독일어 음성 재생 함수
    const speakGerman = (text) => {
        if (!text) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "de-DE";
        utterance.rate = 0.9;
        utterance.pitch = 1;

        window.speechSynthesis.speak(utterance);
    };

    return (
        <Card title="저장목록">

            {data.length === 0 && (
                <Empty description="저장된 번역이 없습니다." />
            )}

            {data.map((item) => (
                <Card
                    key={item.id}
                    type="inner"
                    style={{ marginTop: 16 }}
                    title={
                        <span
                            onClick={() =>
                                setRevealed((prev) => ({
                                    ...prev,
                                    [item.id]: !prev[item.id],
                                }))
                            }
                            style={{
                                cursor: "pointer",
                                padding: "4px 8px",
                                borderRadius: 6,
                                background: revealed[item.id]
                                    ? "transparent"
                                    : "linear-gradient(90deg, #e6e6e6, #f5f5f5)",
                                color: revealed[item.id] ? "inherit" : "transparent",
                                transition: "all 0.3s ease",
                                userSelect: "none",
                                boxShadow: revealed[item.id]
                                    ? "none"
                                    : "inset 0 0 8px rgba(0,0,0,0.1)",
                            }}
                            onMouseEnter={(e) => {
                                if (!revealed[item.id]) {
                                    e.currentTarget.style.background =
                                        "linear-gradient(90deg, #dcdcdc, #ececec)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!revealed[item.id]) {
                                    e.currentTarget.style.background =
                                        "linear-gradient(90deg, #e6e6e6, #f5f5f5)";
                                }
                            }}
                        >
                            {item.source_text}
                        </span>
                    }

                    extra={
                        <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(item.id)}
                        >
                            삭제
                        </Button>
                    }
                >
                    {/* 번역 텍스트 + 음성 버튼 */}
                    <Space align="start">
                        <span>{item.translated_text}</span>

                        <Button
                            size="small"
                            icon={<SoundOutlined />}
                            onClick={() => speakGerman(item.translated_text)}
                        />
                    </Space>

                    <div style={{ marginTop: 8 }}>
                        {/* <Tag color="blue">{item.engine}</Tag> */}
                    </div>

                </Card>
            ))}

        </Card>
    );
}

export default HistoryPanel;
