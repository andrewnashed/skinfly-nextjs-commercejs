import Head from 'next/head'
import commerce from '../lib/commerce'
import Link from 'next/link'
import Product from '../components/Products/Product';

export default function Home({products, categories}) {

  return (
    <>
      <Head>
        <title>Skinfly</title>
        <meta name="description" content="Organic Skincare products for all!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className='flex flex-col items-center justify-center text-gray-700'>
      <div className='flex w-full flex-col justify-center items-center text-center text-2xl h-[400px] px-4'>
        <h2 className='mb-6'>
        MOISTURE IS THE ESSENCE OF WETNESS, AND WETNESS IS THE ESSENCE OF BEAUTY.
        </h2>
        <Link href="/">
        <a className="hover:text-gray-500">
          Find out more &rarr;
        </a>
        </Link>
      </div>
      <div className='bg-sky-100 space-y-10 py-12 w-full text-center text-2xl'>
        <h2 className='text-3xl text-bold'>Categories</h2>
        <section className='flex sm:flex-col items-center justify-evenly sm:space-y-8  lg:w-[50%]'>
        {categories.map(c => {
          return(
            <div key={c.id}
            style={{backgroundImage:(c.assets && c.assets.length > 0) && `linear-gradient(rgba(0,0,0, 0.3), rgba(0, 0, 0, 0.7)), url(${c.assets[0].url})`}}
            className='bg-cover bg-center bg-no-repeat h-[350px] sm:w-[70%] w-[30%] flex justify-center items-center text-white'
            >
              <Link href={`/shop/#${c.slug}`}>
                <a className='text-3xl'>
                  {c.name}
                </a>
              </Link>
            </div>
          )
        })}
        </section>
      </div>
      <div className='flex flex-col items-center justify-center space-y-6 py-12 w-full text-center text-2xl'>
        <h2 className='text-4xl capitalize'>featured products</h2>
        <section className='flex flex-wrap justify-evenly sm:w-full lg:w-[50%]'>
        {products.map(product => <Product key={product.id} product={product}/>)}
        </section>
      </div>
    </div>
    
    </>
  )
}

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
