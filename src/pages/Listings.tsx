
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useInsuranceForm } from "@/contexts/InsuranceFormContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export default function Listings() {
  const { formData } = useInsuranceForm();
  const navigate = useNavigate();

  // Mock recommendations based on form data
  const recommendations = [
    {
      id: "health",
      title: "Health Insurance",
      type: "health",
      priority: "High",
      estimatedCost: "300-600",
      description: "Comprehensive health coverage"
    },
    {
      id: "life",
      title: "Life Insurance",
      type: "life",
      priority: "Medium",
      estimatedCost: "50-150",
      description: "Protection for your dependents"
    },
    {
      id: "disability",
      title: "Disability Insurance",
      type: "disability",
      priority: "Low",
      estimatedCost: "100-200",
      description: "Income protection"
    }
  ].filter(rec => !formData.currentCoverage?.includes(rec.type));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Insurance Recommendations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation) => (
            <Card 
              key={recommendation.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in"
              onClick={() => navigate(`/details/${recommendation.id}`)}
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {recommendation.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${recommendation.priority === 'High' ? 'bg-red-100 text-red-800' : 
                      recommendation.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {recommendation.priority} Priority
                  </span>
                </div>
                
                <p className="text-gray-600">{recommendation.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    ${recommendation.estimatedCost}/month
                  </span>
                  <Button 
                    variant="ghost" 
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
