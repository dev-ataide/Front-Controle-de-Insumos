// src/contexts/JsonContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface JsonDataContextProps {
  jsonData: any[];
  setJsonData: (data: any[]) => void;
}

type Action = { type: 'SET_DATA'; data: any[] };

const jsonDataReducer = (state: any[], action: Action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.data;
    default:
      return state;
  }
};

const JsonDataContext = createContext<JsonDataContextProps | undefined>(undefined);

export const JsonDataProvider = ({ children }: { children: ReactNode }) => {
  const [jsonData, dispatch] = useReducer(jsonDataReducer, []);

  const setJsonData = (data: any[]) => {
    dispatch({ type: 'SET_DATA', data });
  };

  return (
    <JsonDataContext.Provider value={{ jsonData, setJsonData }}>
      {children}
    </JsonDataContext.Provider>
  );
};

export const useJsonData = () => {
  const context = useContext(JsonDataContext);
  if (!context) {
    throw new Error('useJsonData must be used within a JsonDataProvider');
  }
  return context;
};
