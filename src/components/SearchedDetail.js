import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { savePaymentMethod } from "../actions"
import { StoreContext } from "../store";
import { setPage } from "../actions"

export default function SearchedDetail() {
   //const { state: { cart, orderInfo: { loading } }, dispatch } = useContext(StoreContext);
   const { state: { searchedDetail: { order }, requestUserOrder: { loading } }, dispatch } = useContext(StoreContext);
   //const { cartItems } = order.orderItems;
   const history = useHistory()
   const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#8183ff" }} spin />;

   const placeOrderHandler = (values) => {
      console.log(values)
      savePaymentMethod(dispatch, values)
      history.push('/order');
   };

   const onClickHeader = () => {
      //setPage(dispatch, "/profile");
      history.push("/profile");
    };

   // const getTotalPrice = () => {
   //    return (cartItems.length > 0) ?
   //       cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
   //       : 0;
   // }

   const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
   // order.itemsPrice = toPrice(
   //    order.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
   // );
   order.shippingPrice = order.itemsPrice > 100 ? toPrice(0) : toPrice(10);
   order.taxPrice = toPrice(0.15 * order.itemsPrice);
   order.totalPrice = order.itemsPrice + order.shippingPrice + order.taxPrice;


   return (
      <>
         {loading
            ? (
               <div className="spinner-wrap">
                  <Spin indicator={antIcon} className="spinner" />
               </div>
            ) : (
               <Row gutter={[24, 24]}>
                  <Col
                     xs={{ span: 20, offset: 2 }}
                     lg={{ span: 13, offset: 2 }}
                  >
                     <div className="card card-body">
                        <h2 style={{ color: 'white' }}>Shipping</h2>
                        <p>
                           <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                           <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  ,{order.shippingAddress.country}
                        </p>
                     </div>
                     <div className="card card-body">
                        <h2 style={{ color: 'white' }}>Payment</h2>
                        <p>
                           <strong>Method:</strong> {order.paymentMethod}
                        </p>
                     </div>
                     <div className="card card-body">
                        <h2 style={{ color: 'white' }}>Order Items</h2>
                        {
                           order.orderItems.map(item => (
                              <li key={item.id} className="cart-item">
                                 <div className="cart-image">
                                    <img src={item.image} alt={item.name} />
                                 </div>
                                 <div className="cart-item-content">
                                    <div className="cart-name">{item.name}</div>
                                    <div className="product-qty">
                                       Qty: {item.qty}
                                    </div>
                                 </div>
                                 <div className="cart-item-end">
                                    <div className="cart-price">
                                       ${item.price * item.qty}
                                    </div>
                                 </div>

                              </li>
                           ))
                        }
                        <div className="cart-total-price-wrap">
                           Total
            {/* <div className="cart-total-price">${getTotalPrice()}</div> */}
                        </div>
                     </div>

                  </Col>
                  <Col
                     xs={{ span: 20, offset: 2 }}
                     lg={{ span: 7, offset: 0 }}
                  >
                     <div className="card card-body">
                        <h2 style={{ color: 'white' }}>Order Summary</h2>
                        <div className="row">
                           <div>Items</div>
                           <div>${order.itemsPrice}</div>
                        </div>
                        <div className="row">
                           <div>Shipping</div>
                           <div>${order.shippingPrice}</div>
                        </div>
                        <div className="row">
                           <div>Tax</div>
                           <div>${order.taxPrice}</div>
                        </div>
                        <div className="row">
                           <div>
                              <strong> Order Total</strong>
                           </div>
                           <div>
                              <strong>${order.totalPrice}</strong>
                           </div>
                        </div>
                       
                        
                     </div>
                     <div>
                           -------------
                        </div>
                        <div
                           onClick={onClickHeader}
                        >
                           Go back to Profile
                        </div>
                        <div>
                           -------------
                        </div>

                  </Col>
               </Row>

            )

         }
      </>


   );
}

