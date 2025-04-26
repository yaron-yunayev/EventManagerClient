import React, { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({
  onSearch,
  placeholder = "Search by name or ID…",
  className = ""
}) {
  const [query, setQuery] = useState("");

  // Debounce user input by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <FiSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
        size={20}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-10 py-2
          border border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-[#0077B6]
          transition-colors duration-200
        "
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="
            absolute right-3 top-1/2 transform -translate-y-1/2
            text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
            transition-colors duration-200
          "
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
}
