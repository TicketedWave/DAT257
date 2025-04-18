import React from 'react';

export default function YearSelector({ selectedYear, onYearChange }) {
  const years = [2022, 2023, 2024]; // List of available years

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value, 10);
    localStorage.setItem('defaultYear', year); // Save the selected year to localStorage
    onYearChange(year); // Update the state
    window.location.reload(); // Refresh the page
  };

  return (
    <div
      className="year-selector"
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      <label htmlFor="year" style={{ marginBottom: '5px', display: 'block' }}>
        Select Year:
      </label>
      <select
        id="year"
        value={selectedYear}
        onChange={handleYearChange} // Call the new handler
        style={{
          width: '150px',
          padding: '5px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}