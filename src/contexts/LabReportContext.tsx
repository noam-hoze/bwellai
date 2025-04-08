import { createContext, useContext } from "react";

const LabReportContext = createContext<any>(undefined);

export const LabReportProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LabReportContext.Provider value={{}}>{children}</LabReportContext.Provider>
  );
};

export const useLabReport = () => {
  const context = useContext(LabReportContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
