import React,{useState} from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Cart from './Cart';

const Layout = ({children}) => {

    const [openCart, toggleCart] = useState(false)

    const {asPath} = useRouter()
    return ( 
    <div  className=' flex flex-wrap'>
       {asPath ==='/'? <Header toggleCart={toggleCart}/>:<Navbar toggleCart={toggleCart}/>}
       {openCart && <Cart toggleCart={toggleCart}/>}
        <main className='flex flex-col w-full'>
        {children}
        </main>
        <footer className='flex sm:flex-col md:flex-row text-xl items-center space-y-12 flex-wrap sm:space-y-6 justify-evenly w-full bg-black py-6 text-white'>
          <section className='flex flex-col items-center space-y-2'>
            <h3 className='text-3xl'>Support</h3>
            <ul className='grid grid-cols-1'>
                <li>
                <Link href="/">
                    <a>
                        Shipping
                    </a>
                </Link>
                </li>
           
                <li>
                <Link href="/">
                    <a>
                        Returns
                    </a>
                </Link>
                </li>
           
            </ul>
          </section>
          
           <section className='flex flex-col items-center space-y-2 '>
               <h3 className='text-3xl'>
                    Follow Us!
                </h3>
            <ul className='grid grid-cols-2 gap-x-4'>
            
                <Link href="/">
                    <a>
                        Instagram
                    </a>
                </Link>
                <Link href="/">
                    <a>
                        Twitter
                    </a>
                </Link>
                <Link href="/">
                    <a>Facebook
                    </a>
                </Link>
                <Link href="/">
                    <a>Snapchat
                    </a>
                </Link>
            </ul>
           
           </section>
            
            <p className='w-full text-center pt-6'>Copyright © {new Date().getFullYear()} Skinfly all rights reserved.</p>
        </footer>
    </div> 
    );
}
 
export default Layout;