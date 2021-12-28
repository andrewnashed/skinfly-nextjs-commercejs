import React,{useState} from 'react';
import ProductMedia from '../../components/Products/PrdouctAssets'
import commerce from '../../lib/commerce'
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import { UseCartDispatch} from '../../context/cart';


export async function getStaticProps({ params }) {
    const { permalink } = params;
  
    const product = await commerce.products.retrieve(permalink, {
      type: "permalink",
    });
   
  
    return {
      props: {
        product,
      },
    revalidate: 60,
    };
  }
  
  export async function getStaticPaths() {
      const { data: products } = await commerce.products.list();
     
      return {
        paths: products.map(({ permalink}) => ({
          params: {
            permalink,
          },
          
        })),
        fallback: 'blocking',
      };
  }
  

export default function ProductPage({product}) {
    const [quantity, setQuantity] = useState(1)
    console.log(product);
    const images = product.assets.filter(({ is_image }) => is_image);

    const {setCart} = UseCartDispatch();

    const addToCart = () => {
        if(quantity <= product.inventory.available){
            commerce.cart.add(product.id, quantity).then(({cart}) => setCart(cart))
        }
    }

    return(
        <div className='flex justify-evenly py-20 mt-6 lg:mt-10 sm:flex-col sm:items-center'>
        
            <ProductMedia images={images} />

        <section className='flex sm:w-2/3 w-1/3 sm:text-xl text-2xl flex-col sm:text-center
         md:text-left sm:items-center md:items-start sm:mt-8 sm:space-y-5 space-y-5 lg:space-y-10'>
            <h2 className='sm:text-4xl  text-5xl font-bold'>{product.name}</h2>
            <div className='lg:text-4xl text-2xl' dangerouslySetInnerHTML={{__html: product.description}}/>

            <span className='flex sm:w-2/3 w-1/2 bg-sky-100/70 px-3
            py-3 rounded-md  justify-between items-center'>
                <button disabled={quantity >= product.inventory.available } onClick={()=> setQuantity(quantity + 1)} >
                <AiOutlinePlus size={32}/>
                </button>
           
            <p className='text-3xl'>{quantity}</p>
            <button onClick={()=> setQuantity(quantity - 1)} disabled={quantity <= 1}>
            <AiOutlineMinus  size={32} />
            </button>
            
            </span>
            <button onClick={addToCart} className='bg-black text-white text-xl px-7 py-4'> Add To Cart | ${product.price.raw * quantity}</button>
        </section>
        </div>
    )
}