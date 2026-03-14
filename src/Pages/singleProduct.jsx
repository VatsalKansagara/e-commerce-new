import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../assets/Loading4.webm';
import Breadcrums from '../components/Breadcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../Context/CartContext';

export default function SingleProduct() {
    const params = useParams()
    const [singleProduct, setSingleProduct] = useState("")
    const {addToCart} = useCart()

    const getSingleProduct = async () => {
        try{
            const res = await axios.get(`https://dummyjson.com/products/${params.id}`)
            const productsData = res.data;
            setSingleProduct(productsData);
            console.log(res.data);
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, []);

    const OriginalPrice = Math.round(singleProduct.price + (singleProduct.price * singleProduct.discountPercentage / 100 ))

    return (
        <>
            {
                singleProduct ? <div className='px-4 pb-4 md:px-0'>
                    <Breadcrums title={singleProduct.title} />
                    <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Product Image */}
                        <div className="w-full">
                            <img src={singleProduct.thumbnail} alt={singleProduct.title} className='rounded-2xl w-full object-cover'/>
                        </div>
                        {/* product details */}
                        <div className="flex flex-col gap-6">
                            <h1 className='md:text-3xl text-xl font-bold text-gray-800'>{singleProduct.title}</h1>
                            <div className="text-gray-700">
                                {singleProduct.brand?.toUpperCase()} / {singleProduct.category?.toUpperCase()} / {singleProduct.model}
                            </div>
                            <p className='text-xl text-red-500 font-bold'>${singleProduct.price} <span className='line-through text-gray-700'>${OriginalPrice}</span> <span className='bg-red-500 text-white px-4 py-2 rounded-full text-sm'>{singleProduct.discountPercentage}% discount</span></p>
                            <p className='text-gray-600'>{singleProduct.description}</p>

                            {/* qunatity selector */}
                            <div className='flex items-center gap-4'>
                                <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity:</label>
                                <input type="number" min={1} value={1} className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 foucs:ring-red-500'/>
                            </div>

                            <div className='flex gap-4 mt-4'>
                                <button onClick={()=>addToCart(singleProduct)} className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'><IoCartOutline className='w-6 h-6'/> Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div> : 
                <div className='flex items-center justify-center h-screen'>
                    <video muted autoPlay loop>
                    <source src={Loading} type="video/webm" />
                    </video>
                </div>
            }
        </>
    )
}
