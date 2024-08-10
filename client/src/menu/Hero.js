import React from 'react';

function Hero() {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
            <p className="hidden md:block text-gray-500"> </p>
          </div>
          <a 
            href="#Categories" 
            className="inline-block rounded-lg border bg-white px-4 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-150 hover:bg-gray-100 focus:ring active:bg-gray-200"
          >
            More
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <a 
            href="#" 
            className="group relative block h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg transition-transform transform hover:scale-105"
          >
            <img 
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600" 
              alt="Category 1" 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative text-white text-xl font-semibold mb-3 ml-4">Category 1</span>
          </a>
          <a 
            href="#" 
            className="group relative block h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg transition-transform transform hover:scale-105"
          >
            <img 
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600" 
              alt="Category 2" 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative text-white text-xl font-semibold mb-3 ml-4">Category 2</span>
          </a>
          <a 
            href="#" 
            className="group relative block h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg transition-transform transform hover:scale-105"
          >
            <img 
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600" 
              alt="Category 3" 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative text-white text-xl font-semibold mb-3 ml-4">Category 3</span>
          </a>
          <a 
            href="#" 
            className="group relative block h-64 overflow-hidden rounded-lg bg-gray-100 shadow-lg transition-transform transform hover:scale-105"
          >
            <img 
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600" 
              alt="Category 4" 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
            <span className="relative text-white text-xl font-semibold mb-3 ml-4">Category 4</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
