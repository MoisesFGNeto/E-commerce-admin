import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";  
import { subHours } from "date-fns";

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders').then(res => {
        setOrders(res.data);
        setIsLoading(false);
    })
  }, [])

  function ordersTotal(orders) {
    let sum = 0;
    orders.forEach(order => {
      const {line_items} = order;
      line_items.forEach(item => {
        const lineSum = item.quantity * item.price_data.unit_amount/100;
        sum += lineSum;
      });
    }); 
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits:0 }).format(sum);
  }

  if(isLoading) return(
    <Spinner fullWidth={1}/>
  ); 

  const ordersToday = orders.filter(order => new Date(order.createdAt) > subHours(new Date(), 24));
  const ordersWeek = orders.filter(order => new Date(order.createdAt) > subHours(new Date(), 24 * 7));
  const ordersMonth = orders.filter(order => new Date(order.createdAt) > subHours(new Date(), 24 * 30));
  
  return (
    <div className="">
      <h2>Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white shadow-md p-2 text-blue-700 text-center">
          <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">Today</h3>
          <div className="text-3xl text-center mt-1">
            {ordersToday.length}
          </div>
          <div className="text-xs text-gray-400">
            {ordersToday.length} 
            {ordersToday === 1 && 'order '} 
            {ordersToday ? ' orders ' : ' no order '} 
            today
          </div>
        </div>
        <div className="bg-white shadow-md p-2 text-blue-700 text-center">
          <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">This week</h3>
          <div className="text-3xl text-center mt-1">
            {ordersWeek.length}
          </div>
          <div className="text-xs text-gray-400">{ordersWeek.length} orders this week</div>
        </div>
        <div className="bg-white shadow-md p-2 text-blue-700 text-center">
          <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">This month</h3>
          <div className="text-3xl text-center mt-1">
          {ordersMonth.length}
          </div>  
          <div className="text-xs text-gray-400">{ordersMonth.length} orders this month</div>
        </div>
      </div>
      <div>
        <h2>Revenue</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white shadow-md p-2 text-blue-700 text-center">
          <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">Today</h3>
          <div className="text-3xl text-center mt-1">
            {ordersTotal(ordersToday)}
          </div>
          <div className="text-xs text-gray-400">
            {ordersToday.length} {ordersToday === 1 && 'order'} 
            {ordersToday ? ' orders ' : ' no order '} 
             today
          </div>
        </div>
        <div className="bg-white shadow-md p-2 text-blue-700 text-center">
          <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">This week</h3>
          <div className="text-3xl text-center mt-1">
            {ordersTotal(ordersWeek)}
          </div>
          <div className="text-xs text-gray-400">{ordersWeek.length} orders this week</div>
        </div>
        <div className="bg-white shadow-md p-2 text-blue-700 text-center">
          <h3 className="uppercase text-gray-500 font-bold text-xs text-center m-0">This month</h3>
          <div className="text-3xl text-center mt-1">
            {ordersTotal(ordersMonth)}
          </div>  
          <div className="text-xs text-gray-400">{ordersMonth.length} orders today</div>
        </div>
      </div>
      </div>
    </div>
  )
}