import { useState } from "react";
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
  const [activePage, setActivePage] = useState("translate");

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
          {activePage === "translate" && <TranslatorCard />}
          {activePage === "history" && <HistoryPanel />}
        </Content>

      </Layout>
    </Layout>
  );
}

export default App;
