import { createSlice } from "@reduxjs/toolkit";
import { get, set } from "../../storage/storage";

const initialState = {
  cart: get("cart") || {
    products: [],
    totalAmount: 0,
  },
};

const calculateTotalAmount = (products) => {
  return products.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

const findExistingItemIndex = (products, newItem) => {
  return products.findIndex((item) => {
    const idMatch = item.productId === newItem.productId;
    const colorMatch =
      item.color && newItem.color
        ? item.color.name === newItem.color.name &&
          item.color.code === newItem.color.code
        : !item.color && !newItem.color;
    return idMatch && colorMatch;
  });
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = findExistingItemIndex(
        state.cart.products,
        newItem
      );

      if (existingItemIndex !== -1) {
        state.cart.products[existingItemIndex].quantity += 1;
      } else {
        state.cart.products.push({
          productId: newItem.productId,
          name: newItem.name,
          image: newItem.image,
          color: newItem.color,
          price: newItem.price,
          brand: newItem.brand,
          quantity: 1,
        });
      }
      state.cart.totalAmount = calculateTotalAmount(state.cart.products);
      set("cart", state.cart);
    },

    incrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const item = state.cart.products.find(
        (item) => item.productId === productId
      );
      if (item) {
        item.quantity += 1;
        state.cart.totalAmount = calculateTotalAmount(state.cart.products);
        set("cart", state.cart);
      }
    },

    decrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const item = state.cart.products.find(
        (item) => item.productId === productId
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart.products = state.cart.products.filter(
            (item) => item.productId !== productId
          );
        }
        state.cart.totalAmount = calculateTotalAmount(state.cart.products);
        set("cart", state.cart);
      }
    },

    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.cart.products = state.cart.products.filter(
        (item) => item.productId !== productId
      );
      state.cart.totalAmount = calculateTotalAmount(state.cart.products);
      set("cart", state.cart);
    },

    clearCart: (state) => {
      state.cart.products = [];
      state.cart.totalAmount = 0;
      set("cart", state.cart);
    },

    removeProductAfterOrderSuccess: (state, action) => {
      const { productId, color } = action.payload;
      state.cart.products = state.cart.products.filter((item) => {
        const idMatch = item.productId !== productId;
        const colorMatch = color
          ? item.color &&
            (item.color.name !== color.name || item.color.code !== color.code)
          : !item.color;
        return idMatch || colorMatch;
      });
      state.cart.totalAmount = calculateTotalAmount(state.cart.products);
      set("cart", state.cart);
    },
  },
});

export const {
  addToCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  removeProductAfterOrderSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
