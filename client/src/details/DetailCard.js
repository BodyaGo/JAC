import React from 'react';
import { Link } from 'react-router-dom';

function DetailCard({ detail, addToCart }) {
  return (
    <div key={detail._id} className="bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl p-4">
      <img
        src={detail.imageUrl || 'default-image-url'}
        alt={detail.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{detail.name}</h3>
        <p className="text-gray-600 mb-2">Category: <span className="font-semibold">{detail.category}</span></p>
        <p className="text-gray-600 mb-2">Price: <span className="font-semibold">${detail.price}</span></p>
        <p className="text-gray-600 mb-2">Brand: <span className="font-semibold">{detail.brand}</span></p>
        <p className="text-gray-600 mb-4">Availability: <span className="font-semibold">{detail.availability}</span></p>
        <div className="flex space-x-4">
          <Link
            to={`/details/${detail._id}`}
            className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(detail._id)}
            className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
