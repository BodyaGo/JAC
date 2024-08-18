import React, { useState } from 'react';
import PropTypes from 'prop-types';

function FilterSidebar({ machines, selectedFilters, onFilterChange }) {
  const [expandedMachines, setExpandedMachines] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleMachine = (machineId) => {
    setExpandedMachines(prev => ({
      ...prev,
      [machineId]: !prev[machineId]
    }));
  };

  const toggleCategory = (machineId, categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [`${machineId}-${categoryName}`]: !prev[`${machineId}-${categoryName}`]
    }));
  };

  const handleCheckboxChange = (machineId, categoryName, option) => {
    const newFilters = { ...selectedFilters };

    if (!newFilters[machineId]) {
      newFilters[machineId] = {};
    }
    
    if (!newFilters[machineId][categoryName]) {
      newFilters[machineId][categoryName] = [];
    }

    const currentOptions = newFilters[machineId][categoryName];
    if (currentOptions.includes(option)) {
      newFilters[machineId][categoryName] = currentOptions.filter(o => o !== option);
    } else {
      newFilters[machineId][categoryName].push(option);
    }

    onFilterChange(newFilters);
  };

  return (
    <aside className="w-full lg:w-1/4 p-6 bg-white shadow-lg rounded-lg">
      {machines.length > 0 ? (
        machines.map(machine => (
          <div key={machine._id} className="mb-6 border border-gray-300 rounded-lg p-4 transition-shadow duration-300 hover:shadow-2xl bg-white">
            <div className="flex items-start mb-4">
              <img 
                src={machine.imageUrl} 
                alt={machine.name} 
                className="w-28 h-28 object-cover rounded-lg border-2 border-gray-200 shadow-md transition-transform duration-300 transform hover:scale-105"
              />
              <button 
                onClick={() => toggleMachine(machine._id)}
                className="ml-4 flex-grow text-left text-gray-800 font-bold text-xl hover:text-blue-600 transition-colors duration-300"
              >
                {machine.name}
              </button>
              <button
                onClick={() => toggleMachine(machine._id)}
                className="ml-2 flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${expandedMachines[machine._id] ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
            {expandedMachines[machine._id] && (
              <div className="pl-4">
                {machine.categories.map(category => (
                  <div key={category.name} className="mb-4">
                    <button 
                      onClick={() => toggleCategory(machine._id, category.name)}
                      className="w-full flex justify-between items-center text-gray-700 font-semibold text-lg mb-2 hover:text-blue-600 transition-colors duration-300"
                    >
                      <span>{category.name}</span>
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${expandedCategories[`${machine._id}-${category.name}`] ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {expandedCategories[`${machine._id}-${category.name}`] && (
                      <div className="pl-4 space-y-2">
                        {category.options.map(option => (
                          <label key={option} className="flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded-sm focus:ring-blue-500"
                              checked={
                                selectedFilters[machine._id]?.[category.name]?.includes(option) || false
                              }
                              onChange={() => handleCheckboxChange(machine._id, category.name, option)}
                            />
                            <span className="ml-3 text-gray-800 text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No machines available for filtering.</p>
      )}
    </aside>
  );
}

FilterSidebar.propTypes = {
  machines: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
        })
      ).isRequired
    })
  ).isRequired,
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default FilterSidebar;
