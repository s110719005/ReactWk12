import React, { useContext, useEffect } from "react";
import { Layout } from "antd";
import AppHeader from "../components/Header";
import AppFooter from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import UserOrder from "../components/UserOrder";

import { setUserOrder } from "../actions";

import { StoreContext } from "../store";



const { Header, Content, Footer } = Layout;



function Profile() {
  const {dispatch } = useContext(StoreContext);

  useEffect(() => {
    const url = window.location.pathname;
    setUserOrder(dispatch)
  }, []);// eslint-disable-line react-hooks/exhaustive-deps  
  return (
    <Layout className="container main-layout">
      <Layout className="bg-gray main-area">
        <Header className="layout-header">
          <AppHeader title="Profile Page" />
        </Header>
        <Content className="layout-content">
          <ProfileCard />
          <UserOrder/>
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Profile;
