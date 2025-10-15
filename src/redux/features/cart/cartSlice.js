import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

//load localstorage
const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: storedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    //check whether item added to cart or not to lift up state
    addToCart: (state, action) => {
      //declare existing item
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item has been added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        existingItem.quantity += 1;
        Swal.fire({
          title: "item already exist",
          position: "top-end",
          icon: "info",
          title: "Increased item quantity in cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      //save to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      // if there is more than one book reduce the number of item on delete
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }
      //update on rem
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});
//export action
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
