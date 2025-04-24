
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, Briefcase, Users, Shield } from "lucide-react";
import { useInsuranceForm } from "@/contexts/InsuranceFormContext";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formData } = useInsuranceForm();

  const customerData = {
    name: formData.name || "Anonymous Customer",
    age: formData.age,
    occupation: formData.occupation,
    income: formData.annualIncome,
    dependents: formData.dependents,
    riskTolerance: formData.riskTolerance,
  };

  const recommendations = [
    !formData.currentCoverage?.includes('health') && {
      id: "health",
      title: "Health Insurance",
      priority: "High",
      estimatedCost: "300-600",
      description: "Comprehensive health coverage"
    },
    !formData.currentCoverage?.includes('life') && parseInt(formData.dependents) > 0 && {
      id: "life",
      title: "Life Insurance",
      priority: "Medium",
      estimatedCost: "50-150",
      description: "Protection for your dependents"
    },
    !formData.currentCoverage?.includes('disability') && {
      id: "disability",
      title: "Disability Insurance",
      priority: "Low",
      estimatedCost: "100-200",
      description: "Income protection"
    }
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="hover:scale-105 transition-transform"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
        </Button>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{customerData.name}</h1>
                <p className="text-gray-600">Customer Profile</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Age</p>
                  <p className="text-gray-600">{customerData.age} years old</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Occupation</p>
                  <p className="text-gray-600">{customerData.occupation}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Dependents</p>
                  <p className="text-gray-600">{customerData.dependents}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Risk Tolerance</p>
                  <p className="text-gray-600">{customerData.riskTolerance}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Recommended Insurance Plans</h2>
              <div className="space-y-4">
                {recommendations.map((plan) => plan && (
                  <Card key={plan.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{plan.title}</h3>
                        <p className="text-gray-600">{plan.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${plan.priority === 'High' ? 'bg-red-100 text-red-800' : 
                          plan.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {plan.priority} Priority
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-gray-600">
                        ${plan.estimatedCost}/month
                      </span>
                      <Button variant="outline" size="sm">
                        Get Quote
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
