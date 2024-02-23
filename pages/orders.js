import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage(){
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/orders')
        .then(response => {
          setOrders(response.data);
          setIsLoading(false);
        });
    }, []);
    return(
    <Layout>
      <h1>Orders</h1>
      <table className="basic orders-table">
        <thead>
          <tr>
            <td>Date</td>
            <td>Paid</td>
            <td>Recipient</td>
            <td>Products</td>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4}>
                <div className="py-10">
                  <Spinner fullWidth={1}/>
                </div>
              </td>
            </tr>
          )}
          {orders.length > 0 && orders.map(order => (
            <tr key={order._id}>
              <td>
                {(new Date(order.createdAt))
                .toLocaleString()}
              </td> 
              <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                {order.paid ? 'Yes' : 'No'}
              </td>
              <td>{order.name} {order.email} <br/>
                {order.city} {order.postalCode} <br/>
                {order.streetAddress} {order.country}
              </td>
              <td>
          {order.line_items.map((l, index) => ( 
            <div key={index}>
              {l.price_data?.product_data?.name} x {l.quantity} <br />
            </div>
          ))}
        </td>
            </tr>
          ))}
        </tbody>
      </table> 
    </Layout>
    ) 
}