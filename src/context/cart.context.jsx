import { createContext, useReducer } from "react";

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd)=>{
    if(!productToAdd.inStock) return cartItems;
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        );

    // if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id?
             {...cartItem, quantity: cartItem.quantity + 1} : cartItem 
        )
    }
    const newAttributes = productToAdd.attributes.map((attribute, index) =>{
        const newItem = attribute.items.map((item, index) =>{
            if(index === 0) return {...item, selected:true}
            return  {...item, selected:false}
        });
        return {...attribute, items: newItem}
    });
    // return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity:1, attributes:newAttributes}];
}

const modifySelectedAttribute = (cartItems, itemId, attributeId, selectedValue)=>{
    // find item we want to change
    const cartItem = cartItems.find(
        (cartItem) => cartItem.id === itemId
    );

    const newAttributes = cartItem.attributes.map((attribute, index) =>{
        if(attribute.id === attributeId){
            const newItem =attribute.items.map((item) =>{
                if(item.value === selectedValue) return {...item, selected:true}
                return  {...item, selected:false}
            });
            return {...attribute, items: newItem}
        }
        return {...attribute}
    });
    // return new array with modified cartItems/ new cart item
    return cartItems.map((cartItem)=>
        cartItem.id === itemId?
        {...cartItem, attributes:newAttributes} : cartItem 
    );
} 

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
  
    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
  
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
};


const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};
  
const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    getSelectedAttribute: ()=>{},
    cartCount: 0,
    cartTotal: 0
});

export const CartProvidor = ({children})=>{
    const [{ isCartOpen, cartCount, cartTotal, cartItems }, dispatch] = useReducer(
        cartReducer,
        INITIAL_STATE
      );
    
    const updateCartItemsReducer = (cartItems) => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.prices[0].amount,
            0
        ).toFixed(2);
        
        const payload = {
            cartItems,
            cartCount: newCartCount,
            cartTotal: newCartTotal,
        };

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
    };
    

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const getSelectedAttribute = (itemId, attributeId, selectedValue) =>{
        const newCartItems = modifySelectedAttribute(cartItems, itemId, attributeId, selectedValue);
        updateCartItemsReducer(newCartItems);
    }
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool)=>(dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)))
    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        getSelectedAttribute,
        cartItems,
        cartCount,
        cartTotal,
        };

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}