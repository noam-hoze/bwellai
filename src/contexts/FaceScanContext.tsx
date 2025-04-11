// src/context/FaceScanContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

type FaceScanData = {
  hr10s: any;
  hr4s: any;
  realtimeHr: any;
  realtimeHrvSdnn: any;
  realtimeCardiacStress: any;
  results: any;
  setFaceScanData: (data: Partial<FaceScanData>) => void;
};

const FaceScanContext = createContext<FaceScanData | undefined>(undefined);

export const FaceScanProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Omit<FaceScanData, "setFaceScanData">>({
    hr10s: null,
    hr4s: null,
    realtimeHr: null,
    realtimeHrvSdnn: null,
    realtimeCardiacStress: null,
    results: null,
  });

  const setFaceScanData = (updates: Partial<FaceScanData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <FaceScanContext.Provider value={{ ...data, setFaceScanData }}>
      {children}
    </FaceScanContext.Provider>
  );
};

export const useFaceScan = () => {
  const context = useContext(FaceScanContext);
  if (!context) {
    throw new Error("useFaceScan must be used within a FaceScanProvider");
  }
  return context;
};
