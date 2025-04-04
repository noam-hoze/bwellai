import { useState, useEffect } from "react";
import {
  RotateCcw,
  RotateCw,
  Plus,
  Minus,
  Heart,
  Activity,
  Brain,
  Droplets,
} from "lucide-react";
import Lungs from "../icons/Lungs"; // Import our custom Lungs component
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BodyModel from "./body-health-interface/BodyModel";
import HealthMetricsPanel from "./body-health-interface/HealthMetricsPanel";
import { useIsMobile } from "@/hooks/use-mobile";

// Body systems data
const bodySystems = [
  {
    id: "cardiovascular",
    name: "Cardiovascular",
    icon: Heart,
    color: "#FF6B6B",
    regionSelector: "#heart-region",
  },
  {
    id: "respiratory",
    name: "Respiratory",
    icon: Lungs,
    color: "#48BEFF",
    regionSelector: "#lungs-region",
  },
  {
    id: "muscular",
    name: "Muscular",
    icon: Activity,
    color: "#FFA94D",
    regionSelector: "#muscular-region",
  },
  {
    id: "nervous",
    name: "Nervous",
    icon: Brain,
    color: "#845EF7",
    regionSelector: "#brain-region",
  },
  {
    id: "hydration",
    name: "Hydration",
    icon: Droplets,
    color: "#20C997",
    regionSelector: "#hydration-region",
  },
];

const BodyHealthInterface = () => {
  const [selectedSystem, setSelectedSystem] = useState(bodySystems[0]);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  const isMobile = useIsMobile();

  const handleSystemChange = (systemId: string) => {
    const system = bodySystems.find((sys) => sys.id === systemId);
    if (system) {
      setSelectedSystem(system);
    }
  };

  const handleRotateLeft = () => {
    setRotation((prev) => prev - 45);
  };

  const handleRotateRight = () => {
    setRotation((prev) => prev + 45);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 20, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 20, 60));
  };

  return (
    <div className="wellness-card p-4 mb-8 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Health Navigator</h3>

      {isMobile ? (
        <div className="space-y-4">
          {/* Mobile layout - Progressive disclosure */}
          <Tabs
            defaultValue={selectedSystem.id}
            onValueChange={handleSystemChange}
          >
            <TabsList className="w-full grid grid-cols-5 bg-muted p-1 rounded-md">
              {bodySystems.map((system) => (
                <TabsTrigger
                  key={system.id}
                  value={system.id}
                  className="flex flex-col items-center py-2 px-3 data-[state=active]:bg-background"
                >
                  <system.icon
                    className="h-5 w-5 mb-1"
                    style={{ color: system.color }}
                  />
                  <span className="text-xs truncate">{system.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent
              value={selectedSystem.id}
              className="mt-4 animate-fade-in"
            >
              <div className="space-y-4">
                <div className="relative w-full aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden">
                  <BodyModel
                    selectedSystem={selectedSystem}
                    rotation={rotation}
                    zoom={zoom}
                  />

                  {/* Controls */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
                    <div className="space-x-1">
                      <Button
                        onClick={handleRotateLeft}
                        variant="outline"
                        size="sm"
                        className="rounded-full w-8 h-8 p-0 bg-white/90"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleRotateRight}
                        variant="outline"
                        size="sm"
                        className="rounded-full w-8 h-8 p-0 bg-white/90"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-x-1">
                      <Button
                        onClick={handleZoomOut}
                        variant="outline"
                        size="sm"
                        className="rounded-full w-8 h-8 p-0 bg-white/90"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleZoomIn}
                        variant="outline"
                        size="sm"
                        className="rounded-full w-8 h-8 p-0 bg-white/90"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <HealthMetricsPanel system={selectedSystem} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {/* Desktop layout - All visible simultaneously */}
          <div className="col-span-7 space-y-4">
            <div className="flex space-x-4">
              {/* System navigation as buttons instead of tabs */}
              {bodySystems.map((system) => (
                <Button
                  key={system.id}
                  variant={
                    selectedSystem.id === system.id ? "default" : "outline"
                  }
                  onClick={() => handleSystemChange(system.id)}
                  className={cn(
                    "flex items-center gap-2 transition-colors",
                    selectedSystem.id === system.id &&
                      "bg-white text-black hover:bg-white hover:text-black"
                  )}
                  style={
                    selectedSystem.id === system.id
                      ? {
                          backgroundColor: `${system.color}15`,
                          borderColor: system.color,
                          color: system.color,
                        }
                      : {}
                  }
                >
                  <system.icon
                    className="h-4 w-4"
                    style={{ color: system.color }}
                  />
                  <span>{system.name}</span>
                </Button>
              ))}
            </div>

            <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden">
              <BodyModel
                selectedSystem={selectedSystem}
                rotation={rotation}
                zoom={zoom}
              />

              {/* Controls */}
              <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
                <Button
                  onClick={handleRotateLeft}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0 bg-white/90"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleRotateRight}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0 bg-white/90"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>

              <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                <Button
                  onClick={handleZoomIn}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0 bg-white/90"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleZoomOut}
                  variant="outline"
                  size="sm"
                  className="rounded-full w-8 h-8 p-0 bg-white/90"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <HealthMetricsPanel system={selectedSystem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyHealthInterface;
