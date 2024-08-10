import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function CreateDetail() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/details/${id}`);
          setName(res.data.name);
          setDescription(res.data.description);
          setPrice(res.data.price);
          setImageUrl(res.data.imageUrl);
          setIsEditing(true);
        } catch (err) {
          console.error('Fetch Detail error:', err);
          setError('Failed to fetch detail');
        }
      };
      fetchDetail();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !imageUrl) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const detailData = { name, description, price, imageUrl };
      if (isEditing) {
        await axios.put(`http://localhost:3001/api/details/${id}`, detailData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        history.push('/');
      } else {
        await axios.post('http://localhost:3001/api/details', detailData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        history.push('/');
      }
      alert(`${isEditing ? 'Detail updated' : 'Detail created'}`);
    } catch (err) {
      console.error(isEditing ? 'Detail update error:' : 'Detail creation error:', err);
      setError(err.response?.data?.message || 'Failed to save detail');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg mt-12 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{isEditing ? 'Edit Detail' : 'Create Detail'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 shadow-md transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isEditing ? 'Update Detail' : 'Create Detail'}
          </button>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
      </form>
    </div>
  );
}

export default CreateDetail;
