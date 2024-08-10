import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Details = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/details');
        setDetails(response.data.details);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {details.map(detail => (
            <div className="border p-4 rounded shadow-lg">
            <img src={detail.imageUrl} alt={detail.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-bold">{detail.name}</h2>
            <p className="text-gray-700">{detail.description}</p>
            <p className="text-lg font-semibold">${detail.price}</p>
          </div>
      ))}
    </div>
  );
};

export default Details;
