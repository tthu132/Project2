import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);


  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Layout className="flex h-screen">
        <Outlet />
      </Layout>
    </ConfigProvider>
  );
};

export default DefaultLayout;
