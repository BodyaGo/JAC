import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ detail, addToCart }) {
  return (
    <div className="relative m-6 flex w-full max-w flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <Link to={`/details/${detail._id}`} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
          src={detail.imageUrl || 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'}
          alt={detail.name || 'Product image'}
        />
        {detail.discount && (
          <span className="absolute top-2 left-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            {detail.discount}% OFF
          </span>
        )}
      </Link>
      <div className="flex-1 mt-4 px-5 pb-5">
        <Link to={`/details/${detail._id}`}>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 hover:text-blue-600 transition-colors duration-300">{detail.name || 'Product Name'}</h5>
        </Link>
        <div className="mt-3 mb-5 flex items-center justify-between">
          <p className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">${detail.price}</span>
            {detail.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${detail.originalPrice}</span>
            )}
          </p>
          
        </div>
        <button
          onClick={() => addToCart(detail._id)}
          className="flex items-center justify-center w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Придбати
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
