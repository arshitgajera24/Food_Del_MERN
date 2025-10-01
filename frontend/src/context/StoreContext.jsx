import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({children}) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if(!cartItems[itemId])
        {
            setCartItems((prev) => ({
                ...prev, [itemId]:1
            }))
        }
        else
        {
            setCartItems((prev) => ({
                ...prev, [itemId]:prev[itemId]+1
            }))
        }

        if(token)
        {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, {itemId}, {headers: {token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev, [itemId]: prev[itemId]-1
        }))

        if(token)
        {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove`, {itemId}, {headers: {token}})
        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const id in cartItems)
        {
            if(cartItems[id] > 0)
            {
                let itemInfo = food_list.find((product) => product._id === id);
                totalAmount += itemInfo.price * cartItems[id];
            }
        }

        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food/list`)
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/get`, {}, {headers: {token}})
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() 
        {
            await fetchFoodList();
            if(localStorage.getItem("token"))
            {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list, cartItems, setCartItems, addToCart, removeFromCart, getTotalCartAmount, token, setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;