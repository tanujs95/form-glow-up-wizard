
import React, { createContext, useContext, useState } from 'react';
import { InsuranceFormData, FormStep } from '@/types/insurance';

type InsuranceFormContextType = {
  formData: InsuranceFormData;
  currentStep: FormStep;
  setFormData: (data: Partial<InsuranceFormData>) => void;
  setCurrentStep: (step: FormStep) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const InsuranceFormContext = createContext<InsuranceFormContextType | undefined>(undefined);

export const InsuranceFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormDataState] = useState<InsuranceFormData>({
    name: "",
    age: "",
    occupation: "",
    annualIncome: "",
    dependents: "",
    zipCode: "",
    currentCoverage: [],
    assets: [],
    healthConditions: [],
    riskTolerance: "medium",
    additionalInfo: "",
  });

  const [currentStep, setCurrentStep] = useState<FormStep>("personal");
  const [isLoading, setIsLoading] = useState(false);

  const setFormData = (newData: Partial<InsuranceFormData>) => {
    setFormDataState(prev => ({ ...prev, ...newData }));
  };

  return (
    <InsuranceFormContext.Provider 
      value={{ 
        formData, 
        setFormData, 
        currentStep, 
        setCurrentStep,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </InsuranceFormContext.Provider>
  );
};

export const useInsuranceForm = () => {
  const context = useContext(InsuranceFormContext);
  if (!context) {
    throw new Error('useInsuranceForm must be used within InsuranceFormProvider');
  }
  return context;
};
