
import React from "react";
import { Button } from "@/components/ui/button";
import { useInsuranceForm } from "@/contexts/InsuranceFormContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export function RecommendationsView() {
  const { formData } = useInsuranceForm();

  return (
    <div className="animate-fade-in space-y-8">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Your Insurance Recommendations</h1>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-blue-600">Analysis Summary</h2>
          <p className="text-gray-700">
            Based on your profile as a {formData.age}-year-old {formData.occupation} with
            {parseInt(formData.dependents) > 0 ? ` ${formData.dependents} dependents` : ' no dependents'} and 
            income of ${parseInt(formData.annualIncome).toLocaleString()}, we've identified potential coverage gaps.
          </p>
          
          <div className="space-y-2">
            <p className="font-medium">Risk Profile: {formData.riskTolerance === 'low' ? 'Conservative' : formData.riskTolerance === 'medium' ? 'Balanced' : 'Growth-oriented'}</p>
            <div className="space-y-1">
              <p className="font-medium">Coverage Gaps Identified:</p>
              <ul className="list-disc list-inside text-gray-700">
                {!formData.currentCoverage?.includes('health') && <li>Health insurance</li>}
                {!formData.currentCoverage?.includes('life') && parseInt(formData.dependents) > 0 && <li>Life insurance</li>}
                {!formData.currentCoverage?.includes('disability') && <li>Disability insurance</li>}
              </ul>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-600">Recommended Insurance Products</h2>
          
          {!formData.currentCoverage?.includes('health') && (
            <Card className="p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-red-100 text-red-800 rounded-bl-lg text-sm font-medium">
                High Priority
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Health Insurance</h3>
                <p className="text-gray-700">Comprehensive health coverage to protect against medical expenses.</p>
                <div className="space-y-2">
                  <p className="text-gray-600">Estimated Cost: $300-600/month</p>
                  <p className="text-gray-600">Why Recommended: Based on your age ({formData.age}) and occupation as {formData.occupation}.</p>
                </div>
                <Button className="hover:scale-105 transition-transform">
                  Learn More
                </Button>
              </div>
            </Card>
          )}
        </div>

        <Card className="p-6 bg-blue-50">
          <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
          <p className="text-gray-700 mb-4">
            These recommendations are based on the information you've provided. For a more detailed consultation and personalized quotes, we recommend speaking with a licensed insurance agent.
          </p>
          <Button className="hover:scale-105 transition-transform">
            Request Agent Contact
          </Button>
        </Card>

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="hover:scale-105 transition-transform"
          >
            Start Over
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-transform"
          >
            Save Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
}
