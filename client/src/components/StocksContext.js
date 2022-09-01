import { useState, useEffect, createContext } from "react";

export const StocksContext = createContext(null);

export const StocksProvider = ({ children }) => {

const [stocks, setStocks] = useState([]);

return (
    <StocksContext.Provider
      value={{
        stocks, setStocks
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};