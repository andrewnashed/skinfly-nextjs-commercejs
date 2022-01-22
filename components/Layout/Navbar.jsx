import React,{useState, useEffect} from 'react';
import Link from 'next/link'
import Router from 'next/router';
import useWindowDimensions from '../../hooks/useWindowsDimensions';
import {HiMenuAlt1} from 'react-icons/hi'
import {AiOutlineHeart, AiOutlineShopping, AiOutlineClose} from 'react-icons/ai'
import { UseCartState } from '../../context/cart';


const Navbar = ({toggleCart}) => {
    const {total_items} = UseCartState();
    const {width} = useWindowDimensions()
    const [openNav, setOpen] = useState(false)
    const [color, setbColor] = useState(false)
    const toggleNav = ()=> {
        if(openNav) setOpen(false)
        else setOpen(true)
    }
    const changeNavColor = () => {
        if (window.scrollY >= 80) {
            setbColor(true);
        } else {
            setbColor(false)
        }
    }
    useEffect(()=>{
        if(width > 800) setOpen(false)
    },[width])
    if (typeof window !== "undefined") 
    { window.addEventListener('scroll', changeNavColor)}

    return ( <nav 
    style={{backgroundColor:(openNav || color)&&'white', color:(openNav || color)&&'black', position:color && 'fixed'}}
    className='flex flex-wrap flex-row w-full justify-evenly sm:justify-between absolute top-0 z-10 py-4 px-6'>
        <Link href="/"><a className='text-3xl hover:text-gray-500 '>
            Skinfly
            </a></Link>
        {width > 640 && <ul className='flex flex-row text-3xl justify-evenly w-1/2 list-none '>
            <li>
                <Link href="/">
                <a className='hover:text-gray-500 '>
                    Home
                </a>
                </Link>
            </li>
            <li>
                <Link href="/shop">
                <a className='hover:text-gray-500 '>
                    Shop
                </a>
                </Link>
            </li>
            <li>
                <Link href="/">
                <a className='hover:text-gray-500 '> 
                    Contact
                </a>
                </Link>
            </li>
           
        </ul>}
        <span className='flex space-x-4 justify-evenly'>
        <button onClick={() => Router.push('likes')}>
            <AiOutlineHeart size="32"/>
        </button>
        <span className='flex'>
        <button onClick={() =>toggleCart(true) }>
            <AiOutlineShopping size="32"/> 
        </button>
        <sub className='text-lg top-0 mb-6'>{total_items}</sub>
        </span>
        
        <button onClick={toggleNav}>
            {width < 640 && (openNav? <AiOutlineClose size="32"/> :<HiMenuAlt1 size="35"/>)}
        </button>
    
        </span>
       
        {(openNav && width < 640) && <ul 
        className='flex flex-col items-center
        py-8 space-y-4
        w-full list-none text-3xl'>
            <li>
                <Link href="/">
                <a className='hover:text-gray-500'>
                    Home
                </a>
                </Link>
            </li>
            <li>
                <Link href="/shop">
                <a className='hover:text-gray-500 '>
                    Shop
                </a>
                </Link>
            </li>
            <li>
                <Link href="/">
                <a className='hover:text-gray-500 '> 
                    Contact us
                </a>
                </Link>
            </li>
           
        </ul>}
    </nav> );
}
 
export default Navbar;