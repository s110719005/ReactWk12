import { Layout } from "antd";
import { useContext } from "react";
import OrderHeader from "../components/OrderHeader";
import OrderCard from "../components/OrderCard";
import AppFooter from "../components/Footer";
import { StoreContext } from "../store"
const { Header, Content, Footer } = Layout;

function Order() {
   //const { state: { orderInfo } } = useContext(StoreContext);
   const { state: { searchedDetail: { order }, requestUserOrder: { loading } }, dispatch } = useContext(StoreContext);
   //const id = !orderInfo.loading? orderInfo.order.id : "";

   return (
    <Layout className="container main-layout">
      <Layout className="bg-gray main-area">
        
        <Content className="layout-content">
           <OrderCard order={order} />
        </Content>
        <Footer className="layout-footer">
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Order;
