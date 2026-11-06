import React, { useState } from 'react'

const Searchbar = ({ onSearch, loading }) => {
    const [city, setCity] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedCity = city.trim();

        if (!trimmedCity) return;

        onSearch(trimmedCity);
    };
  return (
    <form onSubmit={handleSubmit} className="flex gap-3">

            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="flex-1 rounded-xl bg-slate-800 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Searching...' : 'Search'}
            </button>

        </form>
  )
}

export default Searchbar