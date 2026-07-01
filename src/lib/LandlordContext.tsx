import React, { createContext, useContext, useState } from 'react';

interface LandlordContextType {
  isLandlord: boolean;
  setIsLandlord: (value: boolean) => void;
}

const LandlordContext = createContext<LandlordContextType | undefined>(undefined);

export function LandlordProvider({ children }: { children: React.ReactNode }) {
  const [isLandlord, setIsLandlord] = useState(false);

  return (
    <LandlordContext.Provider value={{ isLandlord, setIsLandlord }}>
      {children}
    </LandlordContext.Provider>
  );
}

export function useLandlord() {
  const context = useContext(LandlordContext);
  if (context === undefined) {
    throw new Error('useLandlord must be used within a LandlordProvider');
  }
  return context;
}
