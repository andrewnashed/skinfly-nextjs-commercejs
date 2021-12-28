import React from 'react';
import { UseCartState, UseCartDispatch } from '../../context/cart';
import Image from 'next/image';
import {AiOutlineClose} from 'react-icons/ai'
import commerce from '../../lib/commerce';
const CartItem = ({item}) =>{
    const {setCart} = UseCartDispatch();
    const handleUpdateCart =({cart}) => setCart(cart)
    const removeItem = () => commerce.cart.remove(item.id).then(handleUpdateCart);
    return(
        <div key={item.id} className='flex justify-between w-full'>
        <Image src={item.image.url}
        alt={`${item.name} picture`}
        width={100}
        height={100}
        className='rounded-md'
        />
        <section className='flex flex-col justify-between w-5/6 px-6 text-xl '>
            <span className='flex justify-between w-full font-bold'>
            <p>{item.name}</p>
        <p>{item.price.formatted_with_symbol}</p>
            </span>
            <div className='flex w-full justify-between'>
            {/* <span className='flex space-x-4 text-2xl'>
                <button>+</button>
                <p>{item.quantity}</p>
                <button>-</button>
            </span> */}
            <p>Qty: {item.quantity}</p>
            <button onClick={removeItem} style={{color:'#EC255A'}} className='underline'>Remove</button>
            </div>
            
        </section>
    </div>
    )
}


const Cart = ({toggleCart}) => {
    const {line_items, subtotal} = UseCartState()
    return ( <div className=' flex flex-col items-center h-screen bg-white sm:w-full md:w-5/6 w-2/5 fixed top-0 right-0 z-20'>
        <span className='flex justify-between items-center w-full px-6 py-4 border-b-2 text-5xl'>
            <h2 className=' '>Cart</h2>
            <button onClick={() => toggleCart(false)}><AiOutlineClose/></button>
        </span>
        <section className='flex flex-col h-screen items-center w-full px-6 py-4 space-y-8'>
        {line_items.map(item => {
            return(
                <CartItem item={item} />
            )
        })}
        </section>
    </div> );
}
 
export default Cart;