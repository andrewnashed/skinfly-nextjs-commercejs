import React from 'react';
import Product from '../../components/Products/Product';
import commerce from '../../lib/commerce'
  
export const getStaticProps = async () => {
    const {data: products} = await commerce.products.list({status:'active'})
    const {data: categories} = await commerce.categories.list()
    return {
      props: {
        products,
        categories
      },
    revalidate: 60,
    }
  }
  

export default function ShopPage({products, categories}){
 
    return(
        <div className='my-24 w-full flex flex-col items-center space-y-10'>
            {categories.map(category => {
                return(
                    <section id={`${category.slug}`} key={category.id} className='w-full flex flex-col items-center space-y-6'>
                        <h2 className='text-4xl text-bold'>{category.name}</h2>
                        <section className='flex w-[70%] justify-evenly items-center flex-wrap place-items-center md:w-[90%] sm:w-full'>
                        {products.filter(product => product.categories[0].name === category.name ).map(product => <Product key={product.id} product={product} />)}
                        </section>
                    </section>
                )
            })}
        </div>
    )
}