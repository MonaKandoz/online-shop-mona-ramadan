import { createContext, useState, useEffect } from "react";

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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount ] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.prices[0].amount,
          0
        );
        setCartTotal(newCartTotal.toFixed(2));
      }, [cartItems]);

    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));
        return;
    }

    const getSelectedAttribute = (itemId, attributeId, selectedValue) =>{
        setCartItems(modifySelectedAttribute(cartItems, itemId, attributeId, selectedValue))
    }
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

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