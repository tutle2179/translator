import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HistoryOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button } from "antd";

import TranslatorCard from "./components/TranslatorCard";
import HistoryPanel from "./components/HistoryPanel";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  // ✅ 새로고침해도 현재 페이지 유지
  const [activePage, setActivePage] = useState(() => {
    return sessionStorage.getItem("activePage") || "translate";
  });

  // ✅ activePage가 바뀔 때마다 저장
  useEffect(() => {
    sessionStorage.setItem("activePage", activePage);
  }, [activePage]);

  return (
    <Layout style={{ height: "100vh" }}>
      {/* 왼쪽 사이드 메뉴 */}
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div
          style={{
            height: 64,
            margin: 16,
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 8,
          }}
        >
          {collapsed ? "T" : "Translator"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activePage]}
          onClick={({ key }) => setActivePage(key)}
          items={[
            {
              key: "translate",
              icon: <UserOutlined />,
              label: "번역",
            },
            {
              key: "history",
              icon: <HistoryOutlined />,
              label: "저장목록",
            },
          ]}
        />
      </Sider>

      {/* 오른쪽 영역 */}
      <Layout>
        {/* 상단 헤더 */}
        <Header
          style={{
            padding: 0,
            background: "#fff",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: 16,
              width: 64,
              height: 64,
            }}
          />
        </Header>

        {/* 콘텐츠 영역 */}
        <Content
          style={{
            margin: 24,
            overflow: "auto",
          }}
        >
          {/* ✅ 컴포넌트 유지 + 화면만 토글 */}
          <div style={{ display: activePage === "translate" ? "block" : "none" }}>
            <TranslatorCard />
          </div>

          <div style={{ display: activePage === "history" ? "block" : "none" }}>
            {/* ✅ history로 들어올 때마다 새로 불러오게 activePage 전달 */}
            <HistoryPanel activePage={activePage} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;