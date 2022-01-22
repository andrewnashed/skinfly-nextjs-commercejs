import React, {useState, useEffect} from 'react';
import {HiOutlineHeart, HiHeart, HiPlus} from 'react-icons/hi';
import Link from 'next/link';
import commerce from '../../lib/commerce';
import { UseCartDispatch } from '../../context/cart';

const Product = ({product}) => {
    const {setCart} = UseCartDispatch()
    const [heart, setHeart] = useState(false)


    useEffect(()=>{
      let likedProducts = JSON.parse(localStorage.getItem('products'))
      for (let i=0; i<likedProducts.length; i++) {
        if(likedProducts[i].id === product.id){
          setHeart(true)
        }
      }
    },[heart])
    const toggleHeart = (e) => {
      e.stopPropagation(); 
        if(heart) {
          setHeart(false);
          let likedProducts = JSON.parse(localStorage.getItem('products'));
          let newArr = likedProducts.filter(item => item.id !== product.id)
          localStorage.setItem('products', JSON.stringify(newArr))
        }
        else {
          setHeart(true);
          let likedProducts = JSON.parse(localStorage.getItem('products'))
          if (likedProducts === null) likedProducts = [];
          likedProducts.push(product)
          localStorage.setItem(`products`, JSON.stringify(likedProducts));
        }
    }

    const addToCart = (e) => {
      e.stopPropagation(); 
          commerce.cart.add(product.id, 1).then(({cart}) => setCart(cart))
  }



    return ( 
      <Link href={`/shop/${product.permalink}`}>
      <div className='sm:w-[45%]  w-[30%]  mt-6'>
        <div            
         style={{backgroundImage: `linear-gradient(rgba(0,0,0, 0.3), rgba(0, 0, 0, 0.7)), url(${product.image.url})`}}
         className='bg-cover t bg-center bg-no-repeat h-[250px]  flex justify-end text-white'>             
        <span className='flex flex-col space-y-2 items-center justify-end p-8'>
            <button className='p-2' onClick={addToCart}><HiPlus size={30}/></button>
            <button onClick={toggleHeart}>{heart?<HiHeart color='#EC255A' size={30}/>:<HiOutlineHeart size={30}/>}</button>
        </span>
        </div>
        <span className='flex flex-row justify-between mt-2 font-bold text-sm'>
          <h3>{product.name}</h3>
          <h3>{product.price.formatted_with_symbol}</h3>
        </span>
      </div>
     </Link>
     );
}
 
export default Product;