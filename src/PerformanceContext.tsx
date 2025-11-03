// src/PerformanceContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { PerformanceEvent } from './PerformancePanel';


// Context shape
type PerformanceContextValue = {
  events: PerformanceEvent[];
  addEvent: (event: PerformanceEvent) => void;
  clearEvents: () => void;
};

const PerformanceContext = createContext<PerformanceContextValue | undefined>(undefined);

export const usePerformanceContext = () => {
  const ctx = useContext(PerformanceContext);
  if (!ctx) throw new Error("PerformanceContext must be used within PerformanceProvider");
  return ctx;
};

// Provider component
export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<PerformanceEvent[]>([]);

  const addEvent = (event: PerformanceEvent) => setEvents(prev => [...prev, event]);
  const clearEvents = () => setEvents([]);

  return (
    <PerformanceContext.Provider value={{ events, addEvent, clearEvents }}>
      {children}
    </PerformanceContext.Provider>
  );
};
