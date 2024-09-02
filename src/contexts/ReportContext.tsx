'use client';

import { useState, createContext } from 'react';

export interface ReportContextValue {
  corporationClass: string;
  corporationName: string;
  reportTitle: string;
}

interface ReportContext {
  reportContextValue: ReportContextValue;
  updateReportContextValue: (value: Partial<ReportContextValue>) => void;
}

const initialReportContextValue: ReportContextValue = {
  corporationClass: '',
  corporationName: '',
  reportTitle: '',
};

export const ReportContext = createContext<ReportContext>({
  reportContextValue: initialReportContextValue,
  updateReportContextValue: (value: Partial<ReportContextValue>) => {},
});

export const ReportContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [reportContextValue, setReportContextValue] =
    useState<ReportContextValue>(initialReportContextValue);

  const updateReportContextValue = (value: Partial<ReportContextValue>) => {
    setReportContextValue((reportContextValue) => Object.assign({}, reportContextValue, value));
  };

  return (
    <ReportContext.Provider value={{ reportContextValue, updateReportContextValue }}>
      {children}
    </ReportContext.Provider>
  );
};
