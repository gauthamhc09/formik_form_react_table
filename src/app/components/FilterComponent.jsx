'use client'

const FilterComponent = ({ filterInput, handleFilterChange }) => {
    return (
        <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder="Search"
            className="mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
    )
}

export default FilterComponent