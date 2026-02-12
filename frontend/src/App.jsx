import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import TranslatorCard from "./components/TranslatorCard";
import AppFooter from "./components/AppFooter";

const { Content } = Layout;

function App() {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppHeader />

      <Content
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "40px",
          background: "#f5f5f5",
        }}
      >
        <div style={{ width: "100%", maxWidth: 1200 }}>
          <TranslatorCard />
        </div>
      </Content>

      <AppFooter />
    </Layout>
  );
}

export default App;
