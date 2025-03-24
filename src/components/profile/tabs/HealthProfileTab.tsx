import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { User, HeartPulse, Upload, Dna, Activity } from "lucide-react";
import { toast } from "sonner";
import {
  CommonGeneVariantsData,
  CommonGeneVariantsDataDescriptionMapping,
  ExerciseFrequency,
} from "@/modules/constant/profile";
import { useGetCreateProfile } from "@/service/hooks/profile/useGetCreateProfile";

const HealthProfileTab = ({
  getProfileIsData,
  weightUnit,
  heightUnit,
  distanceUnit,
  temperatureUnit,
  language,
}) => {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<string>("male");
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number>(0);
  const [smoker, setSmoker] = useState<string>("no");
  const [alcohol, setAlcohol] = useState<string>("occasionally");
  const [exercise, setExercise] = useState<string>("weekly");
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
  const [commonCondition, setCommonCondition] = useState<string[]>([
    "Asthma",
    "Diabetes",
  ]);
  const [geneVariant, setGeneVariant] = useState<string>("");

  const {
    mutate: createProfileMutate,
    isSuccess: createProfileIsSuccess,
    error: createProfileError,
  } = useGetCreateProfile();

  useEffect(() => {
    // Calculate BMI when height or weight changes
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));
    }
  }, [height, weight]);

  useEffect(() => {
    if (getProfileIsData) {
      setAge(getProfileIsData?.age);
      setGender(getProfileIsData?.gender);
      setHeight(getProfileIsData?.height);
      setWeight(getProfileIsData?.weight);
      setBmi(
        getProfileIsData?.additionalDetails?.[
          "What is your Body Mass Index (BMI)?"
        ]?.answersArray?.[0] || ""
      );
      setGeneVariant(
        getProfileIsData?.additionalDetails?.[
          "What Common Gene Variants do you have? (may impact the insights we offer)"
        ]?.answersArray?.[0] || ""
      );
      setExerciseTypes(
        getProfileIsData?.additionalDetails?.[
          "What type of exercise do you typically engage in?"
        ]?.answersArray || []
      );
      setExercise(
        getProfileIsData?.additionalDetails?.[
          "How often do you exercise in a week?"
        ]?.answersArray?.[0] || ""
      );
      setAlcohol(
        getProfileIsData?.additionalDetails?.[
          "How often do you consume alcohol?"
        ]?.answersArray?.[0] || ""
      );
      setSmoker(
        getProfileIsData?.additionalDetails?.[
          "Do you smoke or use tobacco products?"
        ]?.answersArray?.[0] || ""
      );
      setCommonCondition(
        getProfileIsData?.additionalDetails?.[
          "Have you been diagnosed with any chronic health conditions?"
        ]?.answersArray || []
      );
    }
  }, [
    getProfileIsData?.age,
    getProfileIsData?.gender,
    getProfileIsData?.height,
    getProfileIsData?.weight,
  ]);

  const handleExerciseTypeChange = (type: string) => {
    setExerciseTypes((prev) => {
      console.log(prev);

      return prev?.includes(type)
        ? prev?.filter((t) => t !== type)
        : [...prev, type];
    });
  };

  const handleSaveProfile = () => {
    createProfileMutate({
      additionalDetails: {
        "What is your Body Mass Index (BMI)?": {
          answersArray: [bmi],
          include_in_interpretation: true,
        },
        "Do you smoke or use tobacco products?": {
          answersArray: [smoker],
          include_in_interpretation: true,
        },
        "How often do you consume alcohol?": {
          answersArray: [alcohol],
          include_in_interpretation: true,
        },
        "What Common Gene Variants do you have? (may impact the insights we offer)":
          { answersArray: [geneVariant], include_in_interpretation: true },
        "How often do you exercise in a week?": {
          answersArray: [exercise],
          include_in_interpretation: true,
        },
        "What type of exercise do you typically engage in?": {
          answersArray: exerciseTypes,
          include_in_interpretation: true,
        },
        "Have you been diagnosed with any chronic health conditions?": {
          answersArray: commonCondition,
          include_in_interpretation: true,
        },
      },
      age,
      gender,
      height,
      weight,
      language,
      weightUnit,
      heightUnit,
      distanceUnit,
      temperatureUnit,
    });
    toast.success("Health profile updated successfully");
  };

  const handleCheckboxChange = (condition: string) => {
    setCommonCondition((prev) =>
      prev?.includes(condition)
        ? prev?.filter((item) => item !== condition)
        : [...prev, condition]
    );
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
                  {bmi < 18.5
                    ? "Underweight"
                    : bmi < 25
                    ? "Normal weight"
                    : bmi < 30
                    ? "Overweight"
                    : "Obese"}
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
                {[
                  "Asthma",
                  "Diabetes",
                  "Hypertension",
                  "Heart Disease",
                  "Arthritis",
                ].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition.toLowerCase()}
                      checked={commonCondition?.includes(condition)}
                      onCheckedChange={() => handleCheckboxChange(condition)}
                    />
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
              <Label htmlFor="additional-conditions">
                Additional Conditions
              </Label>
              <Input
                id="additional-conditions"
                placeholder="Enter any other conditions"
              />
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
              <RadioGroup
                value={smoker}
                onValueChange={setSmoker}
                className="flex space-x-4"
              >
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
              <RadioGroup
                value={alcohol}
                onValueChange={setAlcohol}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="alcohol-daily" />
                  <Label htmlFor="alcohol-daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="alcohol-weekly" />
                  <Label htmlFor="alcohol-weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="occasionally"
                    id="alcohol-occasionally"
                  />
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
              <RadioGroup
                value={exercise}
                onValueChange={setExercise}
                className="flex flex-wrap gap-4"
              >
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
                  { id: "team-sports", label: "⚽ Team Sports" },
                  { id: "Hiking", label: "⛰️ Hiking" },
                ].map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleExerciseTypeChange(type.id)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-sm ${
                      exerciseTypes?.includes(type.id)
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
            Genetic variants can impact how your body responds to diet,
            exercise, and medication.
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
                  {CommonGeneVariantsData?.map((d) => {
                    return <SelectItem value={d.title}>{d.title}</SelectItem>;
                  })}
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
                <h4 className="font-medium mb-1">{geneVariant}</h4>
                <p className="text-sm">
                  {CommonGeneVariantsDataDescriptionMapping?.[geneVariant]}
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
