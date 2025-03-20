
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Languages, Ruler, Scale, Thermometer } from "lucide-react";
import { toast } from "sonner";

const PreferencesTab = () => {
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [distanceUnit, setDistanceUnit] = useState("km");
  const [temperatureUnit, setTemperatureUnit] = useState("C");
  const [language, setLanguage] = useState("english");

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    toast.success(`Language changed to ${value}`);
  };

  return (
    <div className="space-y-6">
      {/* Language & Display Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Languages className="h-5 w-5 text-wellness-bright-green" />
            Language & Display
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="japanese">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units of Measure Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Ruler className="h-5 w-5 text-wellness-bright-green" />
            Units of Measure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <Scale className="h-4 w-4 mr-2 text-wellness-bright-green" /> 
                  Weight
                </Label>
                <ToggleGroup 
                  type="single" 
                  variant="outline" 
                  value={weightUnit} 
                  onValueChange={(value) => value && setWeightUnit(value)}
                  className="justify-start"
                >
                  <ToggleGroupItem value="kg" aria-label="Toggle kg">kg</ToggleGroupItem>
                  <ToggleGroupItem value="lb" aria-label="Toggle lb">lb</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-wellness-bright-green" /> 
                  Height
                </Label>
                <ToggleGroup 
                  type="single" 
                  variant="outline" 
                  value={heightUnit} 
                  onValueChange={(value) => value && setHeightUnit(value)}
                  className="justify-start"
                >
                  <ToggleGroupItem value="cm" aria-label="Toggle cm">cm</ToggleGroupItem>
                  <ToggleGroupItem value="ft" aria-label="Toggle ft">ft</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <Ruler className="h-4 w-4 mr-2 text-wellness-bright-green" /> 
                  Distance
                </Label>
                <ToggleGroup 
                  type="single" 
                  variant="outline" 
                  value={distanceUnit} 
                  onValueChange={(value) => value && setDistanceUnit(value)}
                  className="justify-start"
                >
                  <ToggleGroupItem value="km" aria-label="Toggle km">km</ToggleGroupItem>
                  <ToggleGroupItem value="miles" aria-label="Toggle miles">miles</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-2 text-wellness-bright-green" /> 
                  Temperature
                </Label>
                <ToggleGroup 
                  type="single" 
                  variant="outline" 
                  value={temperatureUnit} 
                  onValueChange={(value) => value && setTemperatureUnit(value)}
                  className="justify-start"
                >
                  <ToggleGroupItem value="C" aria-label="Toggle Celsius">°C</ToggleGroupItem>
                  <ToggleGroupItem value="F" aria-label="Toggle Fahrenheit">°F</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreferencesTab;
