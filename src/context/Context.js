import { createContext, useContext, useReducer } from "react";
import faker from "faker";
import { cartReducer, productReducer } from "./Reducers";
import items from '../Items';
import React, { useState } from 'react'

const getLocalStorageData = () => {
  const item = localStorage.getItem('data');
  if (item) {
    return JSON.parse(item);
  } else {
    return [];
  }
}

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const [data, setData] = useState(getLocalStorageData())
  const [logout, setlogout] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState();


  const [state, dispatch] = useReducer(cartReducer, {
    products: items,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  function togglemodal() {
    setType(1)
    setIsOpen(!modalIsOpen);
  }


  return (
    <Cart.Provider value={{
      state,
      dispatch,
      productState,
      productDispatch,
      setData,
      data,
      logout,
      setlogout,
      modalIsOpen,
      setIsOpen,
      type,
      setType,
      togglemodal
    }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
