import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Update the body model image to use the new anatomical image
const bodyImageUrl =
  "/lovable-uploads/d7268c72-011c-45d3-8b5e-599565846313.png";

// Define health regions with their positions and sizes, but without status indicators
const healthRegions = [
  { id: "heart-region", position: { top: "35%", left: "50%" }, size: "40px" },
  { id: "lungs-region", position: { top: "30%", left: "50%" }, size: "60px" },
  { id: "brain-region", position: { top: "10%", left: "50%" }, size: "40px" },
  {
    id: "muscular-region",
    position: { top: "50%", left: "50%" },
    size: "100px",
  },
  {
    id: "hydration-region",
    position: { top: "45%", left: "50%" },
    size: "80px",
  },
];

interface BodyModelProps {
  selectedSystem: {
    id: string;
    name: string;
    color: string;
    regionSelector: string;
  };
  rotation: number;
  zoom: number;
}

const BodyModel: React.FC<BodyModelProps> = ({
  selectedSystem,
  rotation,
  zoom,
}) => {
  const isMobile = useIsMobile();
  const [pulsatingRegions, setPulsatingRegions] = useState<string[]>([]);

  // Set up pulsating effect for selected system
  useEffect(() => {
    // Extract the region ID from the selector
    const regionId = selectedSystem.regionSelector.replace("#", "");
    setPulsatingRegions([regionId]);
  }, [selectedSystem]);

  // Get border color for selected system
  const getBorderForRegion = (regionId: string): string => {
    const isSelected = selectedSystem.regionSelector === `#${regionId}`;
    return isSelected ? selectedSystem.color : "transparent";
  };

  return (
    <div
      className="relative w-full h-full"
      style={{
        perspective: "1000px",
        overflow: "hidden",
      }}
    >
      {/* Body image with rotation and zoom */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${bodyImageUrl})`,
          transform: `rotateY(${rotation}deg) scale(${zoom / 100})`,
          transformOrigin: "center center",
        }}
      />

      {/* Health indicator regions - now only showing borders for the selected system */}
      {healthRegions.map((region) => (
        <div
          key={region.id}
          id={region.id}
          className={`absolute rounded-full transition-all cursor-pointer ${
            pulsatingRegions.includes(region.id) ? "animate-pulse" : ""
          }`}
          style={{
            top: region.position.top,
            left: region.position.left,
            width: region.size,
            height: region.size,
            backgroundColor: "transparent", // Remove background color (health status indicator)
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            border: `2px solid ${getBorderForRegion(region.id)}`,
            boxShadow: pulsatingRegions.includes(region.id)
              ? `0 0 0 4px ${selectedSystem.color}30`
              : "none",
            zIndex: pulsatingRegions.includes(region.id) ? 10 : 5,
            backdropFilter: "blur(3px)",
          }}
        />
      ))}

      {/* System-specific visualization layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: 0.7,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          // In a real app, this would be a specific SVG overlay for each system
          backgroundColor: `${selectedSystem.color}10`,
          transform: `rotateY(${rotation}deg) scale(${zoom / 100})`,
          transformOrigin: "center center",
        }}
      />
    </div>
  );
};

export default BodyModel;
