'use client';
import React, { useState, useEffect } from 'react';

const CountrySelector = ({
    allCountries,
    selectedCountries,
    onCountrySelectionChange,
    isOpen,
    onClose,
    userCountry
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

/* The `useEffect` hook in the provided code snippet is responsible for updating the
`filteredCountries` state based on changes to the `searchTerm` and `allCountries` dependencies. */
    useEffect(() => {
        if (allCountries) {
            setFilteredCountries(
                allCountries.filter(country =>
                    country.name.toLowerCase().includes(searchTerm.toLowerCase())
                ));
        }
    }, [searchTerm, allCountries]);

/**
 * The `handleCountryToggle` function toggles the selection of a country in a list of selected
 * countries.
 * @param countryName - The `countryName` parameter is a string representing the name of a country that
 * the user wants to toggle the selection for.
 */
    const handleCountryToggle = (countryName) => {
        const newSelection = selectedCountries.includes(countryName)
            ? selectedCountries.filter(name => name !== countryName)
            : [...selectedCountries, countryName];

        onCountrySelectionChange(newSelection);
    };

    const areAllFilteredSelected = filteredCountries.every(country =>
        selectedCountries.includes(country.name)
    );

    /**
     * The `handleToggleAll` function toggles the selection of all filtered countries based on the
     * current selection state.
     */
    const handleToggleAll = () => {
        if (areAllFilteredSelected) {
            // Unselect all filtered
            const newSelection = selectedCountries.filter(
                name => !filteredCountries.some(country => country.name === name)
            );
            onCountrySelectionChange(newSelection);
        } else {
            // Select all filtered
            const newSelection = [
                ...new Set([
                    ...selectedCountries,
                    ...filteredCountries.map(c => c.name)
                ])
            ];
            onCountrySelectionChange(newSelection);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`country-selector-overlay ${isOpen ? 'visible' : ''}`}
            onClick={onClose}
            style={{ display: isOpen ? 'block' : 'none' }}
        >
            <div
                className={`country-selector-container ${isOpen ? 'open' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="country-selector-header">
                    <h3 className="country-selector-title">Select Countries to Compare</h3>
                    <button onClick={onClose} className="close-button">
                        &times;
                    </button>
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div className="select-all-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={areAllFilteredSelected}
                                onChange={handleToggleAll}
                                className="country-checkbox"
                            />
                            Select all countries
                        </label>
                    </div>
                </div>

                <div className="countries-list">
                    {filteredCountries.map((country) => (
                        <div key={country.id} className="country-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCountries.includes(country.name)}
                                    onChange={() => handleCountryToggle(country.name)}
                                    className="country-checkbox"
                                />
                                {country.name === userCountry ? `${country.name} (your country)` : country.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CountrySelector;