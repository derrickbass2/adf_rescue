// src/context/ProgressContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProgressContextType {
  checklist: { [key: string]: boolean };
  updateChecklist: (step: string, completed: boolean) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [checklist, setChecklist] = useState({
    profileSetup: false,
    connectAccount: false,
    completeTutorial: false,
  });

  const updateChecklist = (step: string, completed: boolean) => {
    setChecklist((prev) => ({ ...prev, [step]: completed }));
  };

  return (
    <ProgressContext.Provider value={{ checklist, updateChecklist }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};