import React, { useContext } from 'react'
// import Link
import { Link } from "react-router-dom"
// Icons
import { BsPlus, BsEyeFill } from "react-icons/bs"
//Context
import { CartContext } from '../context/CartContext'
import {formatPrice} from '../utils/utils.js'
export function Product({ product }) {
  const { addToCart } = useContext(CartContext)
  // destructure product's properties
  const { id, 
          image, 
          subcategoria=product.category, 
          nombre = product.title, 
          precio=product.price, 
           } = product
  // const { id,
  //         nombre=product.attributes.nombre,
  //         precio=product.attributes.precio,
  //         image= product.attributes.portada.data.attributes.url,
  //         subcategoria=product.attributes.subcategoria.data.attributes.nombre
  //       } = product
  // console.log(attributes)
  // const { precio, portada,subcategoria,nombre} = attributes
  return (
    //<div className='w-full h-[300px] bg-pink-200 mb-4' key={id}> {title}</div>
    <div className='rounded-lg border border-[#e4e4e4]'>
      {/** product's image TOP */}
      <div className=' border-b h-[300px] mb-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex justify-center'>
          {/* Images */}
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <img src={image} alt="" className='max-h-[160px] group-hover:scale-110 duration-300' />

          </div>
          {/**Buttons */}
          <div className='absolute top-6 -right-11 group-hover:right-5 bg-red-500/40 p-2 flex flex-col gap-y-2 justify-center items-center
          opacity-0 group-hover:opacity-100 transition-all duration-300 '>
            <button onClick={() => {
              addToCart(product, id)
            }}>
              <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
                <BsPlus className="text-3xl" />
              </div>
            </button>
            <Link to={`/product/${id}`} className='w-12 h-12 bg-white flex justify-center items-center drop-shadow-xl'>
              <BsEyeFill />
            </Link>
          </div>
        </div>
      </div>
      {/**Category, title and price BOTTOM*/}
      <div className='p-4'>
        <div className='text-sm text-gray-500 capitalize'>{subcategoria}</div>
        <Link to={`/product/${id}`}>
          <h2 className='font-semibold mb-1'>{nombre}</h2>
        </Link>

        <div className='font-semibold'>${formatPrice(precio)}</div>
      </div>

    </div>
  )
}
