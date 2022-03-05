import React,{useEffect, useState} from 'react';
import Product from '../components/Products/Product';



export default function LikesPage(){
    const [likedProducts, setProducts] = useState([])

    useEffect(()=> {
        const products = JSON.parse(localStorage.getItem('products'))
        if (products === null) products = [];
        console.log(products);
        setProducts(products)
    })

   if (likedProducts === null || likedProducts.length <= 0){
       return(
           <div className='flex font-bold text-gray-700 flex-col items-center text-2xl justify-center h-[100vh]'>
               <h2>You have 0 Products in your Likes.</h2>
           </div>
       )
   }

    return(
        <div className='my-24 w-full flex flex-col items-center space-y-4'>
            <h2 className='text-3xl text-gray-700 font-bold'>Products You've liked</h2>
            <section className='flex flex-wrap justify-evenly sm:w-full md:w-[70%] w-[40%]'>
                {likedProducts.map(product => <Product key={product.id} product={product}/>)}
            </section>
        </div>
    )
}