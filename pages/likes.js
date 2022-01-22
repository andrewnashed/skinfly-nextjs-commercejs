import React,{useEffect, useState} from 'react';
import Product from '../components/Products/Product';



export default function LikesPage(){
    const [likedProducts, setProducts] = useState([])

    useEffect(()=> {
        const products = JSON.parse(localStorage.getItem('products'))
        console.log(products);
        setProducts(products)
    })

   if (likedProducts === null || likedProducts.length === 0){
       return(
           <div className='flex flex-col items-center justify-center h-screen'>
               <h2>You have 0 Produts in your Likes.</h2>
           </div>
       )
   }

    return(
        <div className='my-24 w-full flex flex-col items-center space-y-10'>
        <h2 className='text-3xl font-bold'>Products You've liked</h2>
        <section className='flex flex-wrap justify-evenly sm:w-full lg:w-[50%]'>
        {likedProducts.map(product => <Product key={product.id} product={product}/>)}
        </section>
        </div>
        )
}