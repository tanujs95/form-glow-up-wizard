
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useInsuranceForm } from "@/contexts/InsuranceFormContext";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formData } = useInsuranceForm();

  const insuranceDetails = {
    health: {
      title: "Health Insurance",
      description: "Comprehensive health coverage to protect against medical expenses.",
      benefits: [
        "Access to quality healthcare providers",
        "Coverage for prescription medications",
        "Preventive care services",
        "Emergency medical services"
      ],
      recommendedFor: `${formData.age}-year-old ${formData.occupation}`,
      estimatedCost: "300-600",
      coverage: "$1,000,000"
    },
    life: {
      title: "Life Insurance",
      description: "Financial protection for your dependents.",
      benefits: [
        "Death benefit protection",
        "Cash value accumulation",
        "Optional riders available",
        "Tax-advantaged growth"
      ],
      recommendedFor: "Individuals with dependents",
      estimatedCost: "50-150",
      coverage: "$500,000"
    },
    disability: {
      title: "Disability Insurance",
      description: "Protection for your income if you're unable to work.",
      benefits: [
        "Monthly income replacement",
        "Own-occupation coverage",
        "Rehabilitation benefits",
        "Return to work incentives"
      ],
      recommendedFor: "Working professionals",
      estimatedCost: "100-200",
      coverage: "60% of income"
    }
  };

  const details = insuranceDetails[id as keyof typeof insuranceDetails];

  if (!details) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">Insurance plan not found</h1>
          <Button onClick={() => navigate(-1)} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

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
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{details.title}</h1>
              <span className="text-2xl font-semibold text-blue-600">
                ${details.estimatedCost}
                <span className="text-sm text-gray-500">/month</span>
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{details.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {details.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-1">Recommended For</h3>
                <p className="text-gray-700">{details.recommendedFor}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-1">Coverage Amount</h3>
                <p className="text-gray-700">{details.coverage}</p>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Request Quote
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
