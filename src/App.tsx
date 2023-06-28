import React from "react";
import {
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Layout, Menu, theme} from "antd";
import {useHistory} from "react-router-dom";
import RouterList from "./RouterList.tsx";


const {Header, Content, Footer, Sider} = Layout;

const items = [
    {
        key: "1",
        icon: <UploadOutlined/>,
        label: "Upload",
        path: "/"
    },
    {
        key: "2",
        icon: <UserOutlined/>,
        label: "My Page",
        path: "/user"
    },

];

const App: React.FC = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const history = useHistory();
    const jumpToPage = (e: any) => {
        history.push(items[e.key - 1].path);
    };

    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className='demo-logo-vertical'/>
                <Menu theme='dark'
                      mode='inline'
                      onClick={jumpToPage}
                      defaultSelectedKeys={["1"]}
                      items={items}/>
            </Sider>
            <Layout className='site-layout'
                    style={{marginLeft: 200}}>
                <Content style={{margin: "24px 16px 0", overflow: "initial"}}>
                    <div style={{padding: 24, textAlign: "center", background: colorBgContainer}}>
                        <RouterList/>
                    </div>
                </Content>
                <div className='placeholder' style={{ height: "68px"}}></div>
                <Footer style={{textAlign: "center", position: "fixed", left: "200px", bottom: "0", width: "100%"}}>
                    Created by Yuehu Jiang | Contact: yuehujiang@sina.com
                </Footer>
            </Layout>
        </Layout>
    );
};

export default (App);
