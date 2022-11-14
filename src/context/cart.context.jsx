import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd)=>{
    if(!productToAdd.inStock) return cartItems;

    if(productToAdd.selectedAttr === undefined){
        var selectedAttr = '';
        const newAttributes = productToAdd.attributes.map((attribute, index) =>{
            console.log(attribute);
            const newItem = attribute.items.map((item, index) =>{
                if(index === 0) {
                    selectedAttr+= item.value;
                    return {...item, selected:true}
                }
                return  {...item, selected:false}
            });
            return {...attribute, items: newItem}
        });
        console.log(cartItems)
        // return new array with modified cartItems/ new cart item
        productToAdd=  {...productToAdd,  attributes:newAttributes, selectedAttr:selectedAttr};
    }
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id &&  cartItem.selectedAttr === productToAdd.selectedAttr 
        );
        console.log(existingCartItem);
    // if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem === existingCartItem?
             {...cartItem, quantity: cartItem.quantity + 1} : cartItem 
        )
    }
    
    return [...cartItems, {...productToAdd, quantity:1}]
    
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id &&  cartItem.selectedAttr === cartItemToRemove.selectedAttr
    );
  
    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem !== existingCartItem);
    }
  
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id &&  cartItem.selectedAttr === cartItemToRemove.selectedAttr
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
    cartCount: 0,
    cartTotal: 0,
    currencySelected: 0,
    currencySymbol: '$',
    itemToAdd: {}
});

export const CartProvidor = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount ] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [currencySelected, setCurrencySelected] = useState(0);
    const [currencySymbol, setCurrencySymbol] = useState('$');
    const [itemToAdd, setItemToAdd] = useState({});

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        console.log(cartItems);
        console.log(currencySelected);
        var newCartTotal = cartItems.reduce(
          (total, cartItem) => total + cartItem.quantity * cartItem.prices[currencySelected].amount,
          0
        );
        console.log(newCartTotal);
        setCartTotal(newCartTotal.toFixed(2));
      }, [cartItems, currencySelected]);


      useEffect(()=>{
console.log('itemto add',itemToAdd)
      },[itemToAdd])
    const addItemToCart = (productToAdd)=>{
        console.log(productToAdd)
        setCartItems(addCartItem(cartItems,productToAdd));
        return;
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
        currencySelected,
        setCurrencySelected,
        currencySymbol, 
        setCurrencySymbol,
        itemToAdd, 
        setItemToAdd
        };

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}