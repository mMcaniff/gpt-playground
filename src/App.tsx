import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  MapPage,
  CreateImagePage,
  TasksPage,
  IdePage,
  StellerAdminToolPage,
  NoPage,
} from "./pages";
import { Layout, Menu, theme } from "antd";
import { navigationConfig } from "./configuration/configuration";
import { Link } from "react-router-dom";
import "./App.css";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [state, setState] = useState<{
    selectedKey: string;
  }>({
    selectedKey: localStorage.getItem("selectedKey") || "2",
  });

  useEffect(() => {
    localStorage.setItem("selectedKey", state.selectedKey);
  }, [state.selectedKey]);

  const onMenuClick = (key: string) => {
    setState({ ...state, selectedKey: key });
  };

  const renderHeader = () => {
    return (
      <Header style={{ position: "fixed", top: 0, width: "100%", zIndex: 999 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[state.selectedKey]}
        >
          {navigationConfig.map((item) => (
            <Menu.Item key={item.key} onClick={({ key }) => onMenuClick(key)}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
    );
  };

  const renderContent = () => {
    return (
      <Content
        className="site-layout"
        style={{
          padding: "64px 0px",
        }}
      >
        {routePages()}
      </Content>
    );
  };

  const renderFooter = () => {
    return (
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    );
  };

  const routePages = () => {
    return (
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="oi-create-image" element={<CreateImagePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="ide" element={<IdePage />} />
        <Route path="steller-admin-tool" element={<StellerAdminToolPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    );
  };

  return (
    <BrowserRouter>
      <Layout>
        {renderHeader()}
        {renderContent()}
        {renderFooter()}
      </Layout>
    </BrowserRouter>
  );
};

export default App;
