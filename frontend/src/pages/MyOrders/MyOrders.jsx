import React from 'react'
import "./MyOrders.css"
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const [data, setData] = useState([])
    const {token} = useContext(StoreContext);

    const fetchOrders = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/userorders`, {}, {headers: {token}});
        setData(response.data.data);
    }

    useEffect(() => {
        if(token) fetchOrders();
    }, [token])

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order,index) => {
                    return <div className='my-orders-order' key={index}>
                        <img src={assets.parcel_icon} alt="parcel" />
                        <p>{order.items.map((item, index) => {
                            if(index === order.items.length - 1)
                            {
                                return item.name+ " x " +item.quantity
                            }
                            else
                            {
                                return item.name+ " x " +item.quantity+ ", "
                            }
                        })}</p>
                        <p>{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf; </span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default MyOrders
