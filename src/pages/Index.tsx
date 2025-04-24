
import React, { useState } from "react";
import { InsuranceFormProvider } from "@/contexts/InsuranceFormContext";
import { Card } from "@/components/ui/card";
import { useInsuranceForm } from "@/contexts/InsuranceFormContext";
import { Progress } from "@/components/ui/progress";
import { CoverageForm } from "@/components/CoverageForm";
import { RiskProfileForm } from "@/components/RiskProfileForm";
import { RecommendationsView } from "@/components/RecommendationsView";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

function FormSteps() {
  const { currentStep, isLoading } = useInsuranceForm();
  
  const steps = [
    { id: "personal", label: "Personal Info" },
    { id: "coverage", label: "Coverage & Assets" },
    { id: "risk", label: "Risk Profile" },
    { id: "recommendations", label: "Recommendations" },
  ];
  
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white p-8 rounded-lg shadow-xl flex items-center gap-4">
          <Loader className="animate-spin" />
          <p className="text-lg">Analyzing your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 md:p-8">
      <Card className="max-w-2xl mx-auto p-6 shadow-lg border-none">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Insurance Recommendation Engine
            </h1>
            <p className="text-gray-500">Let's find the perfect coverage for you</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStepIndex + 1} of {steps.length}</span>
              <span>{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center gap-4 text-gray-500 text-sm">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`font-medium ${currentStep === step.id ? "text-blue-600" : ""}`}>
                  {step.label}
                </div>
                {index < steps.length - 1 && <div className="h-px bg-gray-200 flex-1" />}
              </React.Fragment>
            ))}
          </div>

          {currentStep === "personal" && (
            <div className="animate-fade-in">
              <PersonalInformationForm/>
            </div>
          )}
          
          {currentStep === "coverage" && <CoverageForm />}
          {currentStep === "risk" && <RiskProfileForm />}
          {currentStep === "recommendations" && <RecommendationsView />}
        </div>
      </Card>
    </div>
  );
}

export default function Index() {
  return (
    <InsuranceFormProvider>
      <FormSteps />
    </InsuranceFormProvider>
  );
}

const PersonalInformationForm = () => {
    const {setFormData, formData, setCurrentStep} = useInsuranceForm();
    
    const handleInputChange = (field: string, value: string) => {
      setFormData({ [field]: value });
    };
    
    const handleNext = () => {
      setCurrentStep("coverage");
    };
    
    return(
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Personal Information</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Select onValueChange={(value) => handleInputChange("occupation", value)}>
                    <SelectTrigger id="occupation" className="h-11">
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="business-owner">Business Owner</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">
                  Annual Income
                  <span className="text-gray-400 text-sm ml-1">(USD)</span>
                </Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="Enter your annual income"
                  value={formData.annualIncome}
                  onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    placeholder="Enter number of dependents"
                    value={formData.dependents}
                    onChange={(e) => handleInputChange("dependents", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipcode">ZIP Code</Label>
                  <Input
                    id="zipcode"
                    placeholder="Enter your ZIP code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleNext}
                className="w-full sm:w-auto h-11 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
    );
};
