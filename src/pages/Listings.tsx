
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useInsuranceForm } from "@/contexts/InsuranceFormContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Calendar, Briefcase } from "lucide-react";

export default function Listings() {
  const { formData } = useInsuranceForm();
  const navigate = useNavigate();

  // For now, we only have one customer's data from the form
  const customerData = {
    id: "current",
    name: formData.name || "Anonymous Customer",
    age: formData.age,
    occupation: formData.occupation,
    income: formData.annualIncome,
    dependents: formData.dependents,
    recommendations: formData.currentCoverage ? 
      3 - formData.currentCoverage.length : 3
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Customer Insurance Profiles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            key={customerData.id}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
            onClick={() => navigate(`/details/${customerData.id}`)}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {customerData.name}
                </h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Age: {customerData.age}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  <span>Occupation: {customerData.occupation}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-sm text-gray-600">
                  {customerData.recommendations} Recommendations
                </span>
                <Button 
                  variant="ghost" 
                  className="group-hover:translate-x-1 transition-transform"
                >
                  View Profile <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
