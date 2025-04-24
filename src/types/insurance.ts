
export type InsuranceFormData = {
  // Personal Info
  name: string;
  age: string;
  occupation: string;
  annualIncome: string;
  dependents: string;
  zipCode: string;
  
  // Coverage & Assets
  currentCoverage: string[];
  assets: string[];
  healthConditions: string[];
  
  // Risk Profile
  riskTolerance: "low" | "medium" | "high";
  additionalInfo: string;
};

export type FormStep = "personal" | "coverage" | "risk" | "recommendations";
