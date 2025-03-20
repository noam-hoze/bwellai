
import { useState, useEffect } from "react";
import { MousePointer } from "lucide-react";
import { Organ } from "./bodymap/OrganInterface";
import { organData } from "./bodymap/OrganData";
import OrganDetail from "./bodymap/OrganDetail";

// Updated to use the new human body image
const bodyImageUrl = "/lovable-uploads/cb2ddbda-4493-49aa-9cd5-cb3e497afeed.png"; 

const BodyHealthMap = () => {
  const [organs, setOrgans] = useState<Organ[]>(organData);
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [avatarPosition, setAvatarPosition] = useState({ x: 0, y: 0 });
  
  // Auto-rotate through organs for highlight effect
  useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      const currentIndex = selectedOrgan 
        ? organs.findIndex(o => o.id === selectedOrgan.id)
        : -1;
      
      const nextIndex = (currentIndex + 1) % organs.length;
      setSelectedOrgan(organs[nextIndex]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [selectedOrgan, organs, isRotating]);
  
  const handleOrganClick = (organ: Organ) => {
    setSelectedOrgan(organ);
    setIsRotating(false); // Stop auto-rotation when user interacts
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isRotating) return; // Only move avatar when auto-rotating
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setAvatarPosition({ x, y });
  };
  
  return (
    <div className="wellness-card p-6">
      <h3 className="text-lg font-semibold mb-4">Body Health Map</h3>
      
      <div className="flex flex-col md:flex-row">
        <div 
          className="health-map-container relative flex-1 min-h-[400px] flex justify-center"
          onMouseMove={handleMouseMove}
          onClick={() => setIsRotating(!isRotating)}
        >
          <div className="absolute top-2 right-2 text-xs text-gray-500 flex items-center gap-1">
            <MousePointer className="h-3 w-3" />
            <span>{isRotating ? "Click to pause" : "Click to resume"}</span>
          </div>
          
          {/* Human body silhouette with organs */}
          <div className="relative h-full w-full flex justify-center items-center">
            <div 
              className="absolute inset-0 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${bodyImageUrl})` }}
            ></div>
          </div>
          
          {organs.map((organ) => (
            <div
              key={organ.id}
              className={`organ absolute rounded-full cursor-pointer transition-all duration-300 hover:opacity-80 ${
                selectedOrgan?.id === organ.id ? 'ring-2 ring-primary animate-pulse-soft' : ''
              }`}
              style={{
                top: organ.top,
                left: organ.left,
                width: organ.width,
                height: organ.width,
                backgroundColor: organ.color,
                transform: "translate(-50%, -50%)"
              }}
              onClick={() => handleOrganClick(organ)}
            />
          ))}
          
          {isRotating && (
            <div 
              className="absolute w-6 h-6 bg-primary rounded-full opacity-30 transition-all duration-300"
              style={{
                top: `${avatarPosition.y}%`,
                left: `${avatarPosition.x}%`,
                transform: "translate(-50%, -50%)"
              }}
            />
          )}
        </div>
        
        <div className="md:w-[350px] p-4 animate-fade-in">
          <OrganDetail selectedOrgan={selectedOrgan} />
        </div>
      </div>
    </div>
  );
};

export default BodyHealthMap;
