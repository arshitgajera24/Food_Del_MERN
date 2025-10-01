import React from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';
import {toast} from "react-toastify"


const Verify = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId");
    
    const verifyPayment = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/verify`, {success, orderId})

        if(response.data.success)
        {
            toast.success("Order Placed Successful")
            navigate(`/myorders`)
        }
        else
        {
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

  return (
    <div className='verify'>
        <div className="spinner">
        </div>
    </div>
  )
}

export default Verify
