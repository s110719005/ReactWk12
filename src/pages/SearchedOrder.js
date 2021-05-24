import { useContext, useEffect } from "react";
import { Layout } from 'antd';
import NavBar from "../components/NavBar";
import AppHeader from "../components/Header"
import AppFooter from "../components/Footer"
import ProductDetail from "../components/ProductDetail";
import { setSearchedDetail } from "../actions";
import { StoreContext } from "../store"
import SearchedDetail from "../components/SearchedDetail";
import OrderHeader from "../components/OrderHeader";



const { Header, Content, Footer } = Layout;

function SearchedOrder({ match }) {
   //const { dispatch } = useContext(StoreContext);
   const { state: { searchedDetail: { order }, requestUserOrder: { loading } }, dispatch } = useContext(StoreContext);

  //  useEffect(() => {
  //   setSearchedDetail(dispatch, match.params.productId)
  //  }, [])// eslint-disable-line react-hooks/exhaustive-deps
   return (
    <Layout className="container main-layout">
    <Layout className="bg-gray main-area">
      <Header className="layout-header">
        <OrderHeader title={`Order: ${order.id}`} />
      </Header>
      <Content className="layout-content">
         <SearchedDetail />
      </Content>
      <Footer className="layout-footer">
        <AppFooter />
      </Footer>
    </Layout>
  </Layout>
   );
}

export default SearchedOrder;
