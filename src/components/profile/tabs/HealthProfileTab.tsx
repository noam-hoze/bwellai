
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { User, HeartPulse, Upload, Dna, Activity } from "lucide-react";
import { toast } from "sonner";

const HealthProfileTab = () => {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<string>("male");
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number>(0);
  const [smoker, setSmoker] = useState<string>("no");
  const [alcohol, setAlcohol] = useState<string>("occasionally");
  const [exercise, setExercise] = useState<string>("weekly");
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
  const [geneVariant, setGeneVariant] = useState<string>("");

  useEffect(() => {
    // Calculate BMI when height or weight changes
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));
    }
  }, [height, weight]);

  const handleExerciseTypeChange = (type: string) => {
    setExerciseTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSaveProfile = () => {
    toast.success("Health profile updated successfully");
  };

  return (
    <div className="space-y-6">
      {/* General Information Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5 text-wellness-bright-green" />
            General Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                  min={1}
                  max={120}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="height">Height (cm)</Label>
                  <span>{height} cm</span>
                </div>
                <Slider
                  id="height"
                  min={100}
                  max={220}
                  step={1}
                  value={[height]}
                  onValueChange={(value) => setHeight(value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <span>{weight} kg</span>
                </div>
                <Slider
                  id="weight"
                  min={30}
                  max={200}
                  step={1}
                  value={[weight]}
                  onValueChange={(value) => setWeight(value[0])}
                />
              </div>
              
              <div className="p-4 bg-wellness-light-green rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">BMI</span>
                  <span className="text-xl font-bold">{bmi}</span>
                </div>
                <div className="text-xs text-wellness-muted-black mt-1">
                  {bmi < 18.5 ? "Underweight" : 
                   bmi < 25 ? "Normal weight" : 
                   bmi < 30 ? "Overweight" : "Obese"}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Conditions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-wellness-bright-green" />
            Medical Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="conditions">Common Conditions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Asthma", "Diabetes", "Hypertension", "Heart Disease", "Arthritis"].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox id={condition.toLowerCase()} />
                    <Label htmlFor={condition.toLowerCase()}>{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Medical Documents
              </Button>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="additional-conditions">Additional Conditions</Label>
              <Input id="additional-conditions" placeholder="Enter any other conditions" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lifestyle & Wellness Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="h-5 w-5 text-wellness-bright-green" />
            Lifestyle & Wellness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Do you smoke?</Label>
              <RadioGroup value={smoker} onValueChange={setSmoker} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="smoke-yes" />
                  <Label htmlFor="smoke-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="smoke-no" />
                  <Label htmlFor="smoke-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label>How often do you consume alcohol?</Label>
              <RadioGroup value={alcohol} onValueChange={setAlcohol} className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="alcohol-daily" />
                  <Label htmlFor="alcohol-daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="alcohol-weekly" />
                  <Label htmlFor="alcohol-weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="occasionally" id="alcohol-occasionally" />
                  <Label htmlFor="alcohol-occasionally">Occasionally</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="alcohol-never" />
                  <Label htmlFor="alcohol-never">Never</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label>Exercise frequency</Label>
              <RadioGroup value={exercise} onValueChange={setExercise} className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="exercise-daily" />
                  <Label htmlFor="exercise-daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="exercise-weekly" />
                  <Label htmlFor="exercise-weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="exercise-rarely" />
                  <Label htmlFor="exercise-rarely">Rarely</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="exercise-never" />
                  <Label htmlFor="exercise-never">Never</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label>Type of exercise</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  { id: "gym", label: "🏋️ Gym" },
                  { id: "running", label: "🏃 Running" },
                  { id: "cycling", label: "🚴 Cycling" },
                  { id: "swimming", label: "🏊 Swimming" },
                  { id: "yoga", label: "🧘 Yoga" },
                  { id: "team-sports", label: "⚽ Team Sports" }
                ].map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleExerciseTypeChange(type.id)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-sm ${
                      exerciseTypes.includes(type.id)
                        ? "bg-wellness-bright-green text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {type.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Gene Variants Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Dna className="h-5 w-5 text-wellness-bright-green" />
            Common Gene Variants
          </CardTitle>
          <CardDescription>
            Genetic variants can impact how your body responds to diet, exercise, and medication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gene-variant">Known Gene Variants</Label>
              <Select value={geneVariant} onValueChange={setGeneVariant}>
                <SelectTrigger id="gene-variant">
                  <SelectValue placeholder="Select known variants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apoe">APOE (Alzheimer's risk)</SelectItem>
                  <SelectItem value="mthfr">MTHFR (Folate metabolism)</SelectItem>
                  <SelectItem value="fto">FTO (Weight regulation)</SelectItem>
                  <SelectItem value="actn3">ACTN3 (Muscle performance)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Genetic Test Results
              </Button>
            </div>
            
            {geneVariant && (
              <div className="p-4 bg-wellness-light-green rounded-lg mt-4">
                <h4 className="font-medium mb-1">
                  {geneVariant === "apoe" ? "APOE Gene" : 
                   geneVariant === "mthfr" ? "MTHFR Gene" : 
                   geneVariant === "fto" ? "FTO Gene" : "ACTN3 Gene"}
                </h4>
                <p className="text-sm">
                  {geneVariant === "apoe" ? "Influences cholesterol metabolism and Alzheimer's risk. May require specific dietary adjustments." : 
                   geneVariant === "mthfr" ? "Affects folate metabolism. May impact B-vitamin requirements and cardiovascular health." : 
                   geneVariant === "fto" ? "Associated with obesity risk and weight gain. May influence dietary response." : 
                   "Affects muscle fiber composition. May influence athletic performance and exercise response."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSaveProfile}>Save Health Profile</Button>
      </div>
    </div>
  );
};

export default HealthProfileTab;
