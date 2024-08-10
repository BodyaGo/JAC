import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import FilterSidebar from './FilterSidebar';
import DetailCard from './DetailCard';

function DetailCards() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    priceMin: 0,
    priceMax: 15000,
    availability: [],
    brands: [],
    features: []
  });
  const [sortOption, setSortOption] = useState('popularity');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem('token');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/details', {
        params: { ...selectedFilters, sort: sortOption, page }
      });
      setDetails(response.data.details || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedFilters, sortOption, page]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/features');
        setFeatures(response.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchCategories();
    fetchBrands();
    fetchFeatures();
  }, []);

  const debouncedFetchData = useCallback(debounce(fetchData, 500), [fetchData]);

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
    debouncedFetchData();
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    debouncedFetchData();
  };

  const handlePagination = (direction) => {
    setPage(prevPage => {
      const newPage = direction === 'next' ? prevPage + 1 : prevPage - 1;
      return (newPage >= 1 && newPage <= totalPages) ? newPage : prevPage;
    });
  };

  const addToCart = async (detailId) => {
    if (!token) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3001/api/cart',
        { detailId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Item added to cart.');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-blue-500 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      <FilterSidebar
        categories={categories}
        brands={brands}
        features={features}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        sortOption={sortOption}
      />
      
      <main className="w-full lg:w-3/4 p-4 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <label htmlFor="sort" className="font-semibold text-gray-700">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="ml-2 p-2 border rounded bg-white shadow-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.length > 0 ? (
            details.map(detail => (
              <DetailCard
                key={detail._id}
                detail={detail}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No details found.</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePagination('prev')}
            disabled={page === 1}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <span className="text-gray-700">Page {page} of {totalPages}</span>
          <button
            onClick={() => handlePagination('next')}
            disabled={page === totalPages}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default DetailCards;
