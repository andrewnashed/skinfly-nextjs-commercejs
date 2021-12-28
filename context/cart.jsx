import React, {createContext, useEffect, useContext, useReducer} from 'react';
import commerce from '../lib/commerce';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const SET_CART = 'SET_CART';
const RESET = "RESET";

const intialState = {
    total_items: 0,
    total_unique_items: 0,
    line_items: []
}

const reducer = (state, action) => {
    switch(action.type) {
        case SET_CART:
            return {...state, ...action.payload};
        case RESET:
            return initialState;
        default :
            throw new Error(`Unkown Error: ${action.type}`)
    }
};

export const CartProvider= ({children}) => {
    const [state, dispatch] = useReducer(reducer, intialState)

    useEffect(()=> {
        getCart();
    }, []);

    const setCart = (payload) => dispatch({type: SET_CART, payload})

    const reset = async () => dispatch({ type: RESET });
    
    const getCart= async () => {
        try {
            const cart = await commerce.cart.retrieve();
            setCart(cart)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <CartDispatchContext.Provider value={{setCart, reset}}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const UseCartState = () => useContext(CartStateContext);
export const UseCartDispatch = () => useContext(CartDispatchContext);