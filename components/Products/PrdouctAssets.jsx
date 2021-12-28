import React from 'react';
import Image from 'next/image'

const ProductMedia = ({images}) => {

    if (!images || images.length === 0) return null;


    return ( 
    <div className='sm:w-2/3 w-1/3 md:w-1/2 flex flex-col '>
        <Image
            src={images[0].url} 
            alt={images[0].filename}
            width={images[0].image_dimensions.width}
            height={images[0].image_dimensions.height}
            className='rounded-xl'
        />
        <ul className='justify-self-end mt-8 flex space-x-4'>
            {images.map(image => <li key={image.id}><Image 
                src={image.url}
                alt={image.filename}
                width={70}
                height={70}
                className='rounded-xl'
            /></li>)}
        </ul>
    </div> 
    );
}
 
export default ProductMedia;