import React, { useState } from 'react';
import PropTypes from 'prop-types';

function FilterSidebar({ machines, selectedFilters, onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-full lg:w-1/4 p-4 bg-white shadow-lg rounded-lg mb-6 lg:mb-0 lg:mr-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filter</h2>
      
      {machines.length > 0 ? (
        machines.map(machine => (
          <FilterSection
            key={machine._id}
            title={machine.machine}
            isExpanded={expandedSections[machine._id]}
            onToggle={() => toggleSection(machine._id)}
          >
            <div className="mb-4">
              <p className="font-semibold text-gray-700">Name: {machine.name}</p>
              <p className="text-gray-600">Description: {machine.description}</p>
              <p className="text-gray-800">Price: ${machine.price}</p>
            </div>
            <div className="flex justify-center">
              <img src={machine.imageUrl} alt={machine.name} className="w-full h-auto rounded-lg" />
            </div>
            {/* Add filter checkboxes or other UI components based on machine attributes if necessary */}
          </FilterSection>
        ))
      ) : (
        <p className="text-gray-500">No machines available for filtering.</p>
      )}
    </aside>
  );
}

FilterSidebar.propTypes = {
  machines: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      machine: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

function FilterSection({ title, isExpanded, onToggle, children }) {
  return (
    <div className="mb-6">
      <button 
        onClick={onToggle}
        className="w-full flex justify-between items-center text-gray-700 font-semibold mb-2"
      >
        {title}
        <svg
          className={`w-4 h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isExpanded && <div>{children}</div>}
    </div>
  );
}

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default FilterSidebar;
