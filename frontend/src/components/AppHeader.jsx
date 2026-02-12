import { Layout, Typography, Button } from "antd";

const { Header } = Layout;
const { Title } = Typography;

function AppHeader() {
    return (
        <Header style={{ background: "#001529", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Title level={3} style={{ color: "white", margin: 0 }}>
                Translation Note
            </Title>

            {/* 로그인 버튼 자리 */}
            <Button type="primary">
                로그인
            </Button>
        </Header>
    );
}

export default AppHeader;
