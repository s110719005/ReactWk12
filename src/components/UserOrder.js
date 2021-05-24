import React, { useContext, useEffect } from "react";
import { StoreContext } from "../store";
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Spin } from "antd";

import { setUserOrder } from "../actions";
import OrderItem from "./OrderItem";



const UserOrder = () => {
    const { state: { userOrder: { order }, requestUserOrder: { loading } }} = useContext(StoreContext);
    const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#B6E4D8" }} spin />;

    
  return (
    <div>
        Your Order
        <>
        {loading
            ? (
            <div className="spinner-wrap">
                <Spin indicator={antIcon} className="spinner" />
            </div>
            ) : (
                
            <Row gutter={[32, 32]}>
                {order.map(order => (
                <Col
                    key={order.id}
                    sm={{ span: 12 }}
                    xl={{ span: 8 }}
                    xxl={{ span: 6 }}
                >
                   <OrderItem order={order}/>
                </Col>
                ))}
            </Row>
            )
        }
        </>
    </div>
  );
};
export default UserOrder;
