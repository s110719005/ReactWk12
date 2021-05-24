import { useContext } from "react";
import { Card } from "antd"
import { Link } from 'react-router-dom';
import { StoreContext } from "../store"
import { setSearchedDetail } from "../actions";

export default function OrderItem({ order}) {
    const { dispatch } = useContext(StoreContext);
    return (
        <Card className="bg-gray userOrder">
            <Link to={`/searched-order/${order.id}`} 
                    onClick={()=>{
                        setSearchedDetail(dispatch, order.id);
                     }}
            >
                {order.id}
            </Link>
        </Card>
    );
}
