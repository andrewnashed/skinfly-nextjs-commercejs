import React from 'react';
import Navbar from './Navbar';
import Link from 'next/link'


const Header = ({toggleCart}) => {
    return ( <header
    style={{backgroundImage:"linear-gradient(rgba(0,0,0, 0.3), rgba(0, 0, 0, 0.7)), url(./header.jpeg)"}}
    className="w-full text-white relative bg-cover bg-center bg-no-repeat h-[500px] flex flex-col items-center justify-center" >
        <Navbar toggleCart={toggleCart}/>
        {/* <Image className='-z-10' src="/header.jpeg" alt="hero image" width={1920} height={1280} /> */}
        <div className='text-center'>
            <h1 className='text-6xl'>Skinfly</h1>
            <p className='text-3xl mt-3 mb-6 capitalize'>Organic vegan skincare for all!</p>
            <Link href="/">
                <a className='text-3xl border-2 border-white mt-11 py-2 px-3 hover:bg-white/30'>
                    Shop Now
                </a>
            </Link>
        </div>
    </header> );
}
 
export default Header;