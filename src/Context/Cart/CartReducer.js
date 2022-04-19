const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let updatedCart = [...state.cart];
      let updatedItemIndex = updatedCart.findIndex(
        (item) => item.id == action.payload.id
      );

      // if this product wasnt in the cart
      if (updatedItemIndex < 0) {
        // add quantity to object
        updatedCart.push({ ...action.payload, quantity: 1 });
        console.log(updatedCart);
        return { ...state, cart: updatedCart };
      } else {
        // increment quantity of product
        let updatedItem = updatedCart[updatedItemIndex];
        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
        return { ...state, cart: updatedCart };
      }
    }
    default:
      return state;
  }
};

export default cartReducer;
