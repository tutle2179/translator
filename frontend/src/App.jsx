import { useState } from "react";
import { translateText } from "./api";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [engine, setEngine] = useState("");   // 🔥 추가
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await translateText(input);
      setOutput(res.result);   // 🔥 result에서 번역문 꺼냄
      setEngine(res.engine);   // 🔥 어떤 엔진 썼는지 저장
    } catch (e) {
      setOutput("번역 중 오류 발생");
      setEngine("");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>한국어 → 독일어 번역기</h2>

      <textarea
        rows="5"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="한국어 입력"
      />

      <br />

      <button onClick={handleTranslate}>
        {loading ? "번역 중..." : "번역"}
      </button>

      <br /><br />

      <textarea
        rows="5"
        value={output}
        readOnly
        placeholder="독일어 번역 결과"
      />

      {/* 🔥 여기 추가 */}
      {engine && (
        <p style={{ marginTop: 10 }}>
          사용된 번역 엔진: <strong>{engine}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
