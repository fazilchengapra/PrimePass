import React, { createContext, useContext, useState } from "react";

const NetworkErrorContext = createContext();

export const useNetworkError = () => useContext(NetworkErrorContext);

export const NetworkErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = (message) => setError(message);
  const clearError = () => setError(null);

  return (
    <NetworkErrorContext.Provider value={{ error, showError, clearError }}>
      {children}
      {error && (
        <div className="fixed top-0 w-full bg-red-600 text-white p-4 text-center z-50">
          {error}
          <button onClick={clearError} className="ml-4 underline">
            Dismiss
          </button>
        </div>
      )}
    </NetworkErrorContext.Provider>
  );
};
