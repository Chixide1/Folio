"use client";

import React, {createContext, ReactNode, useContext, useState} from 'react';

// Define the context type
type ActiveIdContextType = {
  activeId: string | null;
  setActiveId: (value: string) => void;
}

// Create context with default value
const ActiveIdContext = createContext<ActiveIdContextType>({
  activeId: null,
  setActiveId: () => {},
});

// Custom hook to use the context
export const useActiveId = () => {
  const context = useContext(ActiveIdContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export function ActiveIdProvider({ children } : { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <ActiveIdContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}