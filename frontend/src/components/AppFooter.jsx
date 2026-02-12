import { Layout } from "antd";

const { Footer } = Layout;

function AppFooter() {
    return (
        <Footer style={{ textAlign: "center", background: "#001529", color: "white" }}>
            React + Django Translator © 2026
        </Footer>
    );
}

export default AppFooter;
