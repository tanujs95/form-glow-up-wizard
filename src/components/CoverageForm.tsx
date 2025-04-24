
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useInsuranceForm } from "@/contexts/InsuranceFormContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

const insuranceTypes = [
  { id: "health", label: "Health Insurance" },
  { id: "life", label: "Life Insurance" },
  { id: "auto", label: "Auto Insurance" },
  { id: "home", label: "Home Insurance" },
  { id: "disability", label: "Disability Insurance" },
  { id: "liability", label: "Liability Insurance" },
  { id: "longterm", label: "Longterm Insurance" },
];

const assetTypes = [
  { id: "home", label: "Home" },
  { id: "vehicle", label: "Vehicle" },
  { id: "investments", label: "Investments" },
  { id: "retirement", label: "Retirement" },
  { id: "business", label: "Business" },
  { id: "valuable-items", label: "Valuable Items" },
];

const healthConditions = [
  { id: "diabetes", label: "Diabetes" },
  { id: "heart-disease", label: "Heart Disease" },
  { id: "cancer", label: "Cancer" },
  { id: "high-blood-pressure", label: "High Blood Pressure" },
  { id: "asthma", label: "Asthma" },
  { id: "none", label: "None" },
];

export function CoverageForm() {
  const { formData, setFormData, setCurrentStep } = useInsuranceForm();

  const handleCoverageChange = (checked: boolean, value: string) => {
    setFormData({
      currentCoverage: checked
        ? [...(formData.currentCoverage || []), value]
        : (formData.currentCoverage || []).filter(item => item !== value)
    });
  };

  const handleAssetsChange = (checked: boolean, value: string) => {
    setFormData({
      assets: checked
        ? [...(formData.assets || []), value]
        : (formData.assets || []).filter(item => item !== value)
    });
  };

  const handleHealthConditionsChange = (checked: boolean, value: string) => {
    setFormData({
      healthConditions: checked
        ? [...(formData.healthConditions || []), value]
        : (formData.healthConditions || []).filter(item => item !== value)
    });
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Current Coverage & Assets</h2>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Existing Insurance Coverage</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insuranceTypes.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={formData.currentCoverage?.includes(id)}
                    onCheckedChange={(checked) => handleCoverageChange(checked as boolean, id)}
                  />
                  <Label htmlFor={id}>{label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Assets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assetTypes.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={formData.assets?.includes(id)}
                    onCheckedChange={(checked) => handleAssetsChange(checked as boolean, id)}
                  />
                  <Label htmlFor={id}>{label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Health Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthConditions.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={formData.healthConditions?.includes(id)}
                    onCheckedChange={(checked) => handleHealthConditionsChange(checked as boolean, id)}
                  />
                  <Label htmlFor={id}>{label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep("personal")}
          className="hover:scale-105 transition-transform"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={() => setCurrentStep("risk")}
          className="hover:scale-105 transition-transform"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
