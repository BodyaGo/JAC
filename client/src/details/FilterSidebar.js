import React from 'react';

function FilterSidebar({ categories, brands, features, selectedFilters, onFilterChange, sortOption }) {
  return (
    <aside className="w-full lg:w-1/4 p-6 bg-gray-50 shadow-lg rounded-lg lg:mr-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Filters</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Category</h3>
        <select
          aria-label="Select Category"
          value={selectedFilters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="block w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category._id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Price Range</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>${selectedFilters.priceMin}</span>
          <span>${selectedFilters.priceMax}</span>
        </div>
        <input
          type="range"
          aria-label="Minimum Price"
          min="0"
          max="15000"
          value={selectedFilters.priceMin}
          onChange={(e) => onFilterChange('priceMin', Number(e.target.value))}
          className="w-full mb-4"
        />
        <input
          type="range"
          aria-label="Maximum Price"
          min="0"
          max="15000"
          value={selectedFilters.priceMax}
          onChange={(e) => onFilterChange('priceMax', Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Availability</h3>
        <ul className="space-y-2">
          <li>
            <label className="inline-flex items-center text-gray-600">
              <input
                type="checkbox"
                value="inStock"
                checked={selectedFilters.availability.includes('inStock')}
                onChange={(e) => onFilterChange('availability', e.target.checked
                  ? [...selectedFilters.availability, e.target.value]
                  : selectedFilters.availability.filter(v => v !== e.target.value))}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">In Stock</span>
            </label>
          </li>
          <li>
            <label className="inline-flex items-center text-gray-600">
              <input
                type="checkbox"
                value="outOfStock"
                checked={selectedFilters.availability.includes('outOfStock')}
                onChange={(e) => onFilterChange('availability', e.target.checked
                  ? [...selectedFilters.availability, e.target.value]
                  : selectedFilters.availability.filter(v => v !== e.target.value))}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">Out of Stock</span>
            </label>
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Brand</h3>
        <ul className="space-y-2">
          {brands.map(brand => (
            <li key={brand._id}>
              <label className="inline-flex items-center text-gray-600">
                <input
                  type="checkbox"
                  value={brand.name}
                  checked={selectedFilters.brands.includes(brand.name)}
                  onChange={(e) => onFilterChange('brands', e.target.checked
                    ? [...selectedFilters.brands, e.target.value]
                    : selectedFilters.brands.filter(v => v !== e.target.value))}
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2">{brand.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Features</h3>
        <ul className="space-y-2">
          {features.map(feature => (
            <li key={feature._id}>
              <label className="inline-flex items-center text-gray-600">
                <input
                  type="checkbox"
                  value={feature.name}
                  checked={selectedFilters.features.includes(feature.name)}
                  onChange={(e) => onFilterChange('features', e.target.checked
                    ? [...selectedFilters.features, e.target.value]
                    : selectedFilters.features.filter(v => v !== e.target.value))}
                  className="form-checkbox text-blue-600"
                />
                <span className="ml-2">{feature.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default FilterSidebar;

