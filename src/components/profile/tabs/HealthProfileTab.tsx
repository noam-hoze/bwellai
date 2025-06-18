import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { User, HeartPulse, Upload, Dna, Activity } from 'lucide-react';
import { toast } from 'sonner';
import {
  allergiesData,
  CommonGeneVariantsData,
  CommonGeneVariantsDataDescriptionMapping,
  currentMedicationOptionsData,
  ExerciseFrequency,
} from '@/models/constant/profile';
import { useGetCreateProfile } from '@/service/hooks/profile/useGetCreateProfile';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { convertHeightValueUnits, convertWeightValueUnits } from '@/utils/utils';
import { h } from 'node_modules/framer-motion/dist/types.d-B50aGbjN';
import { get } from 'http';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const commonConditions = [
  { id: 'hypertension', label: 'Hypertension (High Blood Pressure)' },
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'depression', label: 'Depression/Anxiety' },
  { id: 'arthritis', label: 'Arthritis' },
  { id: 'asthma', label: 'Asthma' },
];

const commonAllergies = [
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'milk', label: 'Milk' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'shellfish', label: 'Shellfish' },
  { id: 'tree-nuts', label: 'Tree Nuts' },
];
const commonMedication = [{ id: '', label: '' }];

const additionalConditions = [
  { id: 'heart-disease', label: 'Heart Disease' },
  { id: 'cancer', label: 'Cancer' },
  { id: 'thyroid-disorder', label: 'Thyroid Disorder' },
  { id: 'copd', label: 'COPD' },
  { id: 'gerd', label: 'GERD (Acid Reflux)' },
  { id: 'ibs', label: 'Irritable Bowel Syndrome' },
  { id: 'migraine', label: 'Migraine' },
  { id: 'insomnia', label: 'Insomnia' },
  { id: 'fibromyalgia', label: 'Fibromyalgia' },
  { id: 'osteoporosis', label: 'Osteoporosis' },
  { id: 'psoriasis', label: 'Psoriasis' },
  { id: 'alzheimers', label: "Alzheimer's Disease" },
  { id: 'parkinsons', label: "Parkinson's Disease" },
];

// Additional allergies for autocomplete
const additionalAllergies = [
  { id: 'soy', label: 'Soy' },
  { id: 'wheat', label: 'Wheat' },
  { id: 'fish', label: 'Fish' },
  { id: 'sesame', label: 'Sesame' },
  { id: 'sulphites', label: 'Sulphites' },
  { id: 'mustard', label: 'Mustard' },
  { id: 'celery', label: 'Celery' },
  { id: 'lupin', label: 'Lupin' },
  { id: 'molluscs', label: 'Molluscs' },
  { id: 'latex', label: 'Latex' },
  { id: 'penicillin', label: 'Penicillin' },
  { id: 'insect-stings', label: 'Insect Stings' },
  { id: 'pollen', label: 'Pollen' },
  { id: 'mold', label: 'Mold' },
  { id: 'pet-dander', label: 'Pet Dander' },
];

const HealthProfileTab = ({
  getProfileIsData,
  weightUnit,
  heightUnit,
  height,
  setHeight,
  weight,
  setWeight,
  distanceUnit,
  temperatureUnit,
  language,
  getUserProfileRefetch,
}) => {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('male');
  const [bmi, setBmi] = useState<number>(0);
  const [smoker, setSmoker] = useState<string>('no');
  const [alcohol, setAlcohol] = useState<string>('occasionally');
  const [exercise, setExercise] = useState<string>('weekly');
  const [exerciseTypes, setExerciseTypes] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isConditionPopoverOpen, setIsConditionPopoverOpen] = useState(false);
  const [otherConditions, setOtherConditions] = useState<string[]>([]);

  const [sliderHeight, setSliderHeight] = useState<number>(height);

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [bloodType, setBloodType] = useState<string>('unknown');
  const [medications, setMedications] = useState<string[]>([]);

  const [geneVariant, setGeneVariant] = useState<string>('');

  const [openAllergy, setOpenAllergy] = useState(false);
  // New allergies autocomplete states
  const [allergySearchValue, setAllergySearchValue] = useState('');
  const [medicalConditionValue, setmedicalConditionValue] = useState('');

  const [isAllergyPopoverOpen, setIsAllergyPopoverOpen] = useState(false);
  const [isMedicalPopoverOpen, setIsMedicalPopoverOpen] = useState(false);

  const {
    mutate: createProfileMutate,
    isSuccess: createProfileIsSuccess,
    error: createProfileError,
  } = useGetCreateProfile();

  useEffect(() => {
    if (createProfileIsSuccess) {
      getUserProfileRefetch();
      toast.success('Health profile updated successfully');
    }
  }, [createProfileIsSuccess]);

  useEffect(() => {
    // Calculate BMI when height or weight changes
    if (height && weight) {
      let heightValue = height;
      let weightValue = weight;
      if (heightUnit === 'ft') {
        heightValue = convertHeightValueUnits(heightUnit, 'cm', heightValue);
      }
      if (weightUnit === 'lb') {
        weightValue = convertWeightValueUnits(weightUnit, 'kg', weightValue);
      }

      const heightInMeters = heightValue / 100;
      const bmiValue = weightValue / (heightInMeters * heightInMeters);

      setBmi(parseFloat(bmiValue.toFixed(1)));
    }
  }, [height, weight, heightUnit, weightUnit]);

  useEffect(() => {
    if (getProfileIsData) {
      setAge(getProfileIsData?.age);
      setGender(getProfileIsData?.gender);
      setHeight(getProfileIsData?.height);
      setWeight(getProfileIsData?.weight);

      if (getProfileIsData?.heightUnit === 'ft') {
        setSliderHeight(convertHeightValueUnits('ft', 'cm', getProfileIsData?.height));
      } else {
        setSliderHeight(getProfileIsData?.height);
      }
      // setBmi(
      //   getProfileIsData?.additionalDetails?.[
      //     "What is your Body Mass Index (BMI)?"
      //   ]?.answersArray?.[0] || ""
      // );
      setGeneVariant(
        getProfileIsData?.additionalDetails?.[
          'What Common Gene Variants do you have? (may impact the insights we offer)'
        ]?.answersArray?.[0] || '',
      );
      setExerciseTypes(
        getProfileIsData?.additionalDetails?.['What type of exercise do you typically engage in?']
          ?.answersArray || [],
      );
      setExercise(
        getProfileIsData?.additionalDetails?.['How often do you exercise in a week?']
          ?.answersArray?.[0] || '',
      );
      setAlcohol(
        getProfileIsData?.additionalDetails?.['How often do you consume alcohol?']
          ?.answersArray?.[0] || '',
      );
      setSmoker(
        getProfileIsData?.additionalDetails?.['Do you smoke or use tobacco products?']
          ?.answersArray?.[0] || '',
      );
      setSelectedConditions(
        getProfileIsData?.additionalDetails?.[
          'Have you been diagnosed with any chronic health conditions?'
        ]?.answersArray || [],
      );
      setSelectedAllergies(
        getProfileIsData?.additionalDetails?.['Do you have any known allergies?']?.answersArray ||
          [],
      );
      setMedications(
        getProfileIsData?.additionalDetails?.['Are you currently taking any medications?']
          ?.answersArray || [],
      );

      setBloodType(
        getProfileIsData?.additionalDetails?.['What is your blood type?']?.answersArray?.[0] ||
          'unknown',
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
      return prev?.includes(type) ? prev?.filter((t) => t !== type) : [...prev, type];
    });
  };

  const handleSaveProfile = () => {
    createProfileMutate({
      additionalDetails: {
        'What is your Body Mass Index (BMI)?': {
          answersArray: [bmi],
          include_in_interpretation: true,
        },
        'Do you smoke or use tobacco products?': {
          answersArray: [smoker],
          include_in_interpretation: true,
        },
        'How often do you consume alcohol?': {
          answersArray: [alcohol],
          include_in_interpretation: true,
        },
        'What Common Gene Variants do you have? (may impact the insights we offer)': {
          answersArray: [geneVariant],
          include_in_interpretation: true,
        },
        'How often do you exercise in a week?': {
          answersArray: [exercise],
          include_in_interpretation: true,
        },
        'What type of exercise do you typically engage in?': {
          answersArray: exerciseTypes,
          include_in_interpretation: true,
        },
        'Have you been diagnosed with any chronic health conditions?': {
          answersArray: selectedConditions,
          include_in_interpretation: true,
        },
        'Do you have any known allergies?': {
          answersArray: selectedAllergies,
          include_in_interpretation: true,
        },
        'Are you currently taking any medications?': {
          answersArray: medications,
          include_in_interpretation: true,
        },
        'What is your blood type?': {
          answersArray: [bloodType],
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
  };

  const handleConditionChange = (conditionId: string) => {
    setSelectedConditions((prev) =>
      prev.includes(conditionId) ? prev.filter((id) => id !== conditionId) : [...prev, conditionId],
    );
  };

  const handleAllergyChange = (allergyId: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergyId) ? prev.filter((id) => id !== allergyId) : [...prev, allergyId],
    );
    setOpenAllergy(false);
  };
  const handleMedicationChange = (allergyId: string) => {
    setMedications((prev) =>
      prev.includes(allergyId) ? prev.filter((id) => id !== allergyId) : [...prev, allergyId],
    );
  };

  const getBmiBackgroundColor = (bmi: number) => {
    if (bmi < 18.5) return 'bg-yellow-100';
    if (bmi < 25) return 'bg-wellness-light-green';
    if (bmi < 30) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getBmiTextColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-yellow-800';
    if (bmi < 25) return 'text-wellness-bright-green';
    if (bmi < 30) return 'text-orange-800';
    return 'text-red-800';
  };

  const handleAddCondition = (condition: string) => {
    if (!selectedConditions.includes(condition) && condition.trim() !== '') {
      setSelectedConditions((prev) => [...prev, condition]);
    }
    setSearchValue('');
    setIsConditionPopoverOpen(false);
  };

  const handleAddAllergy = (allergy: string) => {
    if (!selectedAllergies.includes(allergy) && allergy.trim() !== '') {
      setSelectedAllergies((prev) => [...prev, allergy]);
    }
    setAllergySearchValue('');
    setIsAllergyPopoverOpen(false);
  };
  const handleAddMedicalCondition = (medicalCondition: string) => {
    if (!selectedAllergies.includes(medicalCondition) && medicalCondition.trim() !== '') {
      setMedications((prev) => [...prev, medicalCondition]);
    }
    setmedicalConditionValue('');
    setIsMedicalPopoverOpen(false);
  };

  const filteredConditions = additionalConditions?.filter(
    (condition) =>
      !selectedConditions.includes(condition.id) &&
      condition.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // Filter allergies based on search input
  const filteredAllergies = additionalAllergies.filter(
    (allergy) =>
      !selectedAllergies.includes(allergy.id) &&
      allergy.label.toLowerCase().includes(allergySearchValue.toLowerCase()),
  );

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
                  onChange={(e) => setAge(e.target.value)}
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
                  <Label htmlFor="height">Height ({heightUnit})</Label>
                  <span>
                    {height} {heightUnit}
                  </span>
                </div>
                <Slider
                  id="height"
                  min={100}
                  max={220}
                  step={1}
                  value={[sliderHeight]}
                  onValueChange={(value) => {
                    let newValue = value[0];

                    if (heightUnit === 'ft') {
                      newValue = convertHeightValueUnits('cm', 'ft', newValue);
                      setHeight(newValue);
                    } else {
                      setHeight(newValue);
                    }
                    setSliderHeight(value[0]);
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="weight">Weight ({weightUnit})</Label>
                  <span>
                    {weight} {weightUnit}
                  </span>
                </div>
                <Slider
                  id="weight"
                  min={weightUnit === 'kg' ? 40 : 90}
                  max={weightUnit === 'kg' ? 130 : 300}
                  step={1}
                  value={[weight]}
                  onValueChange={(value) => setWeight(value[0])}
                />
              </div>

              {bmi !== 0 && (
                <div className={`p-4 rounded-lg ${getBmiBackgroundColor(bmi)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">BMI</span>
                    <span className={`text-xl font-bold ${getBmiTextColor(bmi)}`}>{bmi}</span>
                  </div>
                  <div className={`text-xs ${getBmiTextColor(bmi)} mt-1`}>
                    {bmi < 18.5
                      ? 'Underweight'
                      : bmi < 25
                      ? 'Normal weight'
                      : bmi < 30
                      ? 'Overweight'
                      : 'Obese'}
                  </div>
                </div>
              )}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {commonConditions.map((condition) => (
                  <div key={condition.label} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition.label}
                      checked={selectedConditions.includes(condition.id)}
                      onCheckedChange={() => handleConditionChange(condition.id)}
                    />
                    <Label htmlFor={condition.label}>{condition.label}</Label>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Label htmlFor="other-conditions">List any other conditions</Label>

                <div className="mt-1 flex flex-col space-y-2">
                  <Popover open={openAllergy} onOpenChange={setOpenAllergy}>
                    <PopoverTrigger asChild>
                      <div className="flex w-full items-center">
                        <Input
                          id="other-conditions"
                          placeholder="Enter any other medical conditions you have"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          onClick={() => setIsConditionPopoverOpen(true)}
                          className="w-full"
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-full" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search conditions..."
                          value={searchValue}
                          onValueChange={setSearchValue}
                        />
                        <CommandList>
                          <CommandEmpty>No conditions found</CommandEmpty>
                          <CommandGroup>
                            {filteredConditions.map((condition) => (
                              <CommandItem
                                key={condition.id}
                                onSelect={() => {
                                  handleAddCondition(condition.id);
                                }}
                              >
                                {condition.label}
                              </CommandItem>
                            ))}
                            {searchValue.trim() !== '' &&
                              !additionalConditions.some(
                                (c) => c.label.toLowerCase() === searchValue.toLowerCase(),
                              ) && (
                                <CommandItem onSelect={() => handleAddCondition(searchValue)}>
                                  Add "{searchValue}"
                                </CommandItem>
                              )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {selectedConditions?.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {selectedConditions?.map((Conditions) => (
                          <div
                            key={Conditions}
                            className="flex items-center gap-1 bg-wellness-light-green py-1 px-2 rounded-full text-sm"
                          >
                            <span>
                              {commonConditions?.find((a) => a.id === Conditions)?.label ||
                                additionalConditions?.find((a) => a.id === Conditions)?.label ||
                                Conditions}
                            </span>
                            <button
                              onClick={() => handleConditionChange(Conditions)}
                              className="text-wellness-muted-black hover:text-wellness-bright-green transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Do you have any known allergies?</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                {commonAllergies?.map((allergy) => (
                  <div key={allergy.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`allergy-${allergy.id}`}
                      checked={selectedAllergies.includes(allergy.id)}
                      onCheckedChange={() => handleAllergyChange(allergy.id)}
                    />
                    <Label htmlFor={`allergy-${allergy.id}`}>{allergy.label}</Label>
                  </div>
                ))}
              </div>

              <div className="mt-3">
                <Popover open={isAllergyPopoverOpen} onOpenChange={setIsAllergyPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex w-full items-center">
                      <Input
                        id="allergies"
                        placeholder="List any other allergies"
                        value={allergySearchValue}
                        onChange={(e) => setAllergySearchValue(e.target.value)}
                        onClick={() => setIsAllergyPopoverOpen(true)}
                        className="w-full"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-full" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search allergies..."
                        value={allergySearchValue}
                        onValueChange={setAllergySearchValue}
                      />
                      <CommandList>
                        <CommandEmpty>No allergies found</CommandEmpty>
                        <CommandGroup>
                          {filteredAllergies.map((allergy) => (
                            <CommandItem
                              key={allergy.id}
                              onSelect={() => handleAddAllergy(allergy.id)}
                            >
                              {allergy.label}
                            </CommandItem>
                          ))}
                          {allergySearchValue.trim() !== '' &&
                            !additionalAllergies.some(
                              (a) => a.label.toLowerCase() === allergySearchValue.toLowerCase(),
                            ) && (
                              <CommandItem onSelect={() => handleAddAllergy(allergySearchValue)}>
                                Add "{allergySearchValue}"
                              </CommandItem>
                            )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {selectedAllergies.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {selectedAllergies.map((allergy) => (
                      <div
                        key={allergy}
                        className="flex items-center gap-1 bg-wellness-light-green py-1 px-2 rounded-full text-sm"
                      >
                        <span>
                          {commonAllergies.find((a) => a.id === allergy)?.label ||
                            additionalAllergies.find((a) => a.id === allergy)?.label ||
                            allergy}
                        </span>
                        <button
                          onClick={() => handleAllergyChange(allergy)}
                          className="text-wellness-muted-black hover:text-wellness-bright-green transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Are you currently taking any medications?</Label>

              <div className="mt-3">
                <Popover open={isMedicalPopoverOpen} onOpenChange={setIsMedicalPopoverOpen}>
                  <PopoverTrigger asChild>
                    <div className="flex w-full items-center">
                      <Input
                        id="medications"
                        placeholder="List any medications, supplements, or vitamins you are currently taking"
                        value={medicalConditionValue}
                        onChange={(e) => setmedicalConditionValue(e.target.value)}
                        onClick={() => setIsMedicalPopoverOpen(true)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                            const newMedication = e.currentTarget.value.trim();
                            handleMedicationChange(newMedication);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-full" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search allergies..."
                        value={medicalConditionValue}
                        onValueChange={setmedicalConditionValue}
                      />
                      <CommandList>
                        <CommandEmpty>No Medication found</CommandEmpty>
                        <CommandGroup>
                          {currentMedicationOptionsData.map((medicals) => (
                            <CommandItem
                              key={medicals.id}
                              onSelect={() => handleAddMedicalCondition(medicals.id)}
                            >
                              {medicals.label}
                            </CommandItem>
                          ))}
                          {medicalConditionValue.trim() !== '' &&
                            !currentMedicationOptionsData.some(
                              (a) => a.label.toLowerCase() === medicalConditionValue.toLowerCase(),
                            ) && (
                              <CommandItem
                                onSelect={() => handleAddMedicalCondition(medicalConditionValue)}
                              >
                                Add "{medicalConditionValue}"
                              </CommandItem>
                            )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {medications?.length > 0 && (
                <div className="mt-3">
                  <div className="flex flex-wrap gap-2">
                    {medications?.map((medication) => (
                      <div
                        key={medication}
                        className="flex items-center gap-1 bg-wellness-light-green py-1 px-2 rounded-full text-sm"
                      >
                        <span>
                          {commonMedication?.find((a) => a.id === medication)?.label || medication}
                        </span>
                        <button
                          onClick={() => handleMedicationChange(medication)}
                          className="text-wellness-muted-black hover:text-wellness-bright-green transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="blood-type">Blood Type</Label>
              <Select value={bloodType} onValueChange={setBloodType}>
                <SelectTrigger id="blood-type">
                  <SelectValue placeholder="Select your blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a-positive">A+</SelectItem>
                  <SelectItem value="a-negative">A-</SelectItem>
                  <SelectItem value="b-positive">B+</SelectItem>
                  <SelectItem value="b-negative">B-</SelectItem>
                  <SelectItem value="ab-positive">AB+</SelectItem>
                  <SelectItem value="ab-negative">AB-</SelectItem>
                  <SelectItem value="o-positive">O+</SelectItem>
                  <SelectItem value="o-negative">O-</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
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
                  <RadioGroupItem value="occasionally" id="smoke-occasionally" />
                  <Label htmlFor="smoke-occasionally">Occasionally</Label>
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
              <RadioGroup value={exercise} onValueChange={setExercise}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sedentary_adult" id="sedentary-adult" />
                  <Label htmlFor="sedentary-adult">Sedentary Adult: Little or no exercise</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lightly_active" id="lightly-active" />
                  <Label htmlFor="lightly-active">
                    Lightly Active: Light exercise/sports 1-3 days/week
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderately_active" id="moderately-active" />
                  <Label htmlFor="moderately-active">
                    Moderately Active: Moderate exercise/sports 3-5 days/week
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very_active" id="very-active" />
                  <Label htmlFor="very-active">
                    Very Active: Hard exercise/physical job/sports 6-7 days/week
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="super_active" id="super-active" />
                  <Label htmlFor="super-active">
                    Super Active: Very hard exercise/physical job & exercise 2x/day
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Type of exercise</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  { id: 'gym', label: '🏋️ Gym' },
                  { id: 'running', label: '🏃 Running' },
                  { id: 'cycling', label: '🚴 Cycling' },
                  { id: 'swimming', label: '🏊 Swimming' },
                  { id: 'yoga', label: '🧘 Yoga' },
                  { id: 'team-sports', label: '⚽ Team Sports' },
                  { id: 'other', label: '🔄 Other' },
                ].map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleExerciseTypeChange(type.id)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-sm ${
                      exerciseTypes?.includes(type.id)
                        ? 'bg-wellness-bright-green text-white'
                        : 'bg-gray-100 text-gray-700'
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
                  {CommonGeneVariantsData?.map((d) => {
                    return <SelectItem value={d.title}>{d.title}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>

            {geneVariant && geneVariant !== 'None' && (
              <div className="p-4 bg-wellness-light-green rounded-lg mt-4">
                <h4 className="font-medium mb-1">{geneVariant}</h4>
                <p className="text-sm">{CommonGeneVariantsDataDescriptionMapping?.[geneVariant]}</p>
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
