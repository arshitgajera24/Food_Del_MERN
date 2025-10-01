import React from 'react'
import "./List.css"
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const List = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food/list`)
    if(response.data.success)
    {
      setList(response.data.data)
    }
    else
    {
      toast.error(response.data.message);
    }
  }

  const removeFood = async (id) => {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/food/remove`, {id})
    await fetchList();
    if(response.data.success)
    {
      toast.success(response.data.success)
    }
    else
    {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, index) => {
            return (
              <div key={index} className='list-table-format'>
                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/`+item.image} alt="Image" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹ {item.price}</p>
                <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List
