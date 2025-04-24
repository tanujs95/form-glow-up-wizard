
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useInsuranceForm } from "@/contexts/InsuranceFormContext";
import { ArrowLeft } from "lucide-react";

export function RiskProfileForm() {
  const { formData, setFormData, setCurrentStep, setIsLoading } = useInsuranceForm();

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentStep("recommendations");
    setIsLoading(false);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Risk Profile</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Risk Tolerance</h3>
          <RadioGroup
            value={formData.riskTolerance}
            onValueChange={(value) => setFormData({ riskTolerance: value as "low" | "medium" | "high" })}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low" className="text-sm">
                Low - I prefer maximum security and am willing to pay higher premiums
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="text-sm">
                Medium - I want a balanced approach between coverage and cost
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high" className="text-sm">
                High - I'm comfortable with higher deductibles to minimize premiums
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Additional Information</h3>
          <Textarea
            placeholder="Any other details about your situation that might be relevant..."
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ additionalInfo: e.target.value })}
            className="min-h-[150px]"
          />
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep("coverage")}
          className="hover:scale-105 transition-transform"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="hover:scale-105 transition-transform"
        >
          Get Recommendations
        </Button>
      </div>
    </div>
  );
}
