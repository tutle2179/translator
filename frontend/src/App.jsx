import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HistoryOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, Row, Col } from "antd";
import TranslatorCard from "./components/TranslatorCard";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

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
          <GlobalOutlined />
          {!collapsed && "Translator"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "번역",
            },
            {
              key: "2",
              icon: <HistoryOutlined />,
              label: "히스토리",
            },
          ]}
        />
      </Sider>

      {/* 오른쪽 메인 영역 */}
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

        {/* 메인 콘텐츠 */}
        <Content
          style={{
            margin: 24,
            overflow: "auto",
          }}
        >
          <Row gutter={[24, 24]}>

            {/* 번역 카드 영역 */}
            <Col xs={24} lg={16}>
              <TranslatorCard />
            </Col>

            {/* 오른쪽 추가 영역 */}
            <Col xs={24} lg={8}>
              <div
                style={{
                  background: "white",
                  padding: 20,
                  borderRadius: 8,
                  minHeight: 300,
                }}
              >
                추가 기능 영역
              </div>
            </Col>

          </Row>

        </Content>
      </Layout>

    </Layout>
  );
}

export default App;
