import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function CreateDetail() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    machine: '',
    newMachineName: '',
    newMachineImageUrl: '',
    imageUrls: ['']
  });
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const { name, description, price, machine, newMachineName, newMachineImageUrl, imageUrls } = formData;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/machines');
        setMachines(res.data);
      } catch (err) {
        console.error('Fetch machines error:', err);
        setError('Failed to fetch machines');
      }
    };
    fetchMachines();

    if (id) {
      const fetchDetail = async () => {
        try {
          const res = await axios.get(`http://localhost:3001/api/details/${id}`);
          setFormData({ ...res.data, imageUrls: res.data.imageUrls || [''] });
          setIsEditing(true);
        } catch (err) {
          console.error('Fetch Detail error:', err);
          setError('Failed to fetch detail');
        }
      };
      fetchDetail();
    }
  }, [id]);

  useEffect(() => {
    const machine = machines.find(m => m._id === formData.machine);
    setSelectedMachine(machine || null);
  }, [formData.machine, machines]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      imageUrls: newImageUrls,
    }));
  };

  const addImageUrlField = () => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrls: [...prevData.imageUrls, ''],
    }));
  };

  const removeImageUrlField = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrls: prevData.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleMachineChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      machine: value,
      newMachineName: '',
      newMachineImageUrl: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !description || !price || (!machine && (!newMachineName || !newMachineImageUrl)) || imageUrls.some(url => !url)) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const url = isEditing
        ? `http://localhost:3001/api/details/${id}`
        : 'http://localhost:3001/api/details';

      const method = isEditing ? 'put' : 'post';

      // Include new machine details if provided
      const data = {
        name,
        description,
        price,
        machine: machine === 'new' ? { name: newMachineName, imageUrl: newMachineImageUrl } : machine,
        imageUrls
      };

      await axios[method](url, data, { headers });
      history.push('/');
      alert(`${isEditing ? 'Detail updated' : 'Detail created'}`);
    } catch (err) {
      console.error(isEditing ? 'Detail update error:' : 'Detail creation error:', err);
      setError(err.response?.data?.message || 'Failed to save detail');
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl mt-12 max-w-lg border border-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">{isEditing ? 'Edit Detail' : 'Create Detail'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-lg text-gray-700 font-semibold" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter detail name"
            value={name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            aria-required="true"
            aria-invalid={error && !name ? "true" : "false"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg text-gray-700 font-semibold" htmlFor="machine">Machine</label>
          <select
            id="machine"
            name="machine"
            value={machine}
            onChange={handleMachineChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            <option value="" disabled>Select machine or enter a new machine</option>
            {machines.map(machine => (
              <option key={machine._id} value={machine._id}>{machine.name}</option>
            ))}
            <option value="new">Add New Machine</option>
          </select>
        </div>

        {machine === 'new' && (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-lg text-gray-700 font-semibold" htmlFor="newMachineName">New Machine Name</label>
              <input
                type="text"
                id="newMachineName"
                name="newMachineName"
                placeholder="Enter new machine name"
                value={newMachineName}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                aria-required="true"
                aria-invalid={error && !newMachineName ? "true" : "false"}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg text-gray-700 font-semibold" htmlFor="newMachineImageUrl">New Machine Image URL</label>
              <input
                type="text"
                id="newMachineImageUrl"
                name="newMachineImageUrl"
                placeholder="Enter new machine image URL"
                value={newMachineImageUrl}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                aria-required="true"
                aria-invalid={error && !newMachineImageUrl ? "true" : "false"}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-lg text-gray-700 font-semibold" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 h-36 resize-none"
            aria-required="true"
            aria-invalid={error && !description ? "true" : "false"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg text-gray-700 font-semibold" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={price}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            aria-required="true"
            aria-invalid={error && !price ? "true" : "false"}
          />
        </div>

        <div className="space-y-4">
          <label className="text-lg text-gray-700 font-semibold">Image URLs</label>
          {imageUrls.map((url, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={url}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                placeholder="Enter image URL"
                className="border border-gray-300 p-3 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                aria-required="true"
                aria-invalid={error && !url ? "true" : "false"}
              />
              <button
                type="button"
                onClick={() => removeImageUrlField(index)}
                className="bg-red-500 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageUrlField}
            className="bg-blue-500 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Add Another Image
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-4 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-blue-600'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
        >
          {loading ? 'Saving...' : isEditing ? 'Update Detail' : 'Create Detail'}
        </button>
      </form>
    </div>
  );
}

export default CreateDetail;
