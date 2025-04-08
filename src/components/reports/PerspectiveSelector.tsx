import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  X,
  Stethoscope,
  Flower,
  Salad,
  SunMoon,
  Brain,
  Activity,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface PerspectiveSelectorProps {
  activePerspective: string;
  onChange: (perspective: string) => void;
}

interface Perspective {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const perspectives: Perspective[] = [
  {
    id: "MODERN_MEDICINE",
    name: "Modern Medicine",
    icon: Stethoscope,
    color: "#0EA5E9",
    description:
      "Conventional medical interpretation based on clinical research and standard medical practice",
  },
  {
    id: "NATUROPATHIC_MEDICINE",
    name: "Naturopathic",
    icon: Flower,
    color: "#22C55E",
    description:
      "Natural approach focused on optimal ranges and root causes of imbalances",
  },
  {
    id: "REGISTERED_DIETITIANS",
    name: "Dietitian",
    icon: Salad,
    color: "#F97316",
    description:
      "Nutritional analysis focused on dietary influences and metabolic factors",
  },
  {
    id: "TRADITIONAL_CHINESE_MEDICINE",
    name: "TCM",
    icon: SunMoon,
    color: "#6366F1",
    description:
      "Traditional Chinese Medicine view emphasizing energy patterns and holistic balance",
  },
  {
    id: "MENTAL_HEALTH",
    name: "Mental Health",
    icon: Brain,
    color: "#EC4899",
    description:
      "Psychological perspective examining the mind-body connection and emotional impacts",
  },
  {
    id: "FUNCTIONAL_MEDICINE",
    name: "Functional Medicine",
    icon: Activity,
    color: "#9333EA",
    description:
      "Systems-based approach looking at optimal function and interconnected body systems",
  },
];

const PerspectiveSelector = ({
  activePerspective,
  onChange,
}: PerspectiveSelectorProps) => {
  const [showIntro, setShowIntro] = useState(true);
  const activePerspectiveData =
    perspectives.find((p) => p.id === activePerspective) || perspectives[0];

  const handlePerspectiveChange = (value: string) => {
    onChange(value);
    setShowIntro(true);
    setTimeout(() => setShowIntro(false), 5000);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-3">
        View Results Through Different Health Perspectives
      </h2>

      <Tabs
        value={activePerspective}
        onValueChange={handlePerspectiveChange}
        className="w-full"
      >
        <TabsList className="h-auto p-1 bg-slate-100 grid grid-cols-3 md:grid-cols-6 gap-1">
          {perspectives.map((perspective) => (
            <TabsTrigger
              key={perspective.id}
              value={perspective.id}
              className={cn(
                "py-2 flex flex-col items-center justify-center gap-1 h-16 data-[state=active]:bg-white transition-all",
                activePerspective === perspective.id &&
                  `data-[state=active]:text-[${perspective.color}]`
              )}
            >
              <perspective.icon
                className="h-5 w-5"
                style={{
                  color:
                    activePerspective === perspective.id
                      ? perspective.color
                      : undefined,
                }}
              />
              <span className="text-xs">{perspective.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Card
              className="border-l-4 overflow-hidden"
              style={{ borderLeftColor: activePerspectiveData.color }}
            >
              <CardContent className="p-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className="rounded-full p-2 flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${activePerspectiveData.color}20`,
                    }}
                  >
                    <activePerspectiveData.icon
                      className="h-5 w-5"
                      style={{ color: activePerspectiveData.color }}
                    />
                  </div>
                  <div>
                    <p className="font-medium">
                      {activePerspectiveData.name} Perspective
                    </p>
                    <p className="text-sm text-gray-600">
                      {activePerspectiveData.description}
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 ml-1"
                      >
                        Learn more
                      </Button>
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => setShowIntro(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PerspectiveSelector;
