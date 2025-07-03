
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ScanType {
  id: string;
  title: string;
  image: string;
  description: string;
  guidelines: string[];
  bgColor: string;
  borderColor: string;
}

interface ScanTypeCardProps {
  scan: ScanType;
  onScanStart: (scanId: string) => void;
}

const ScanTypeCard = ({ scan, onScanStart }: ScanTypeCardProps) => {
  return (
    <Card className={`${scan.bgColor} ${scan.borderColor} border-2 hover:shadow-lg transition-all duration-300 overflow-hidden`}>
      <CardContent className="p-0">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{scan.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">{scan.description}</p>
            <Button 
              onClick={() => onScanStart(scan.id)}
              className="w-full bg-wellness-bright-green hover:bg-wellness-green-gradient text-white font-semibold py-2 mb-4"
            >
              Start {scan.title.split(' ')[0]} Scan
            </Button>
            <div className="w-full h-32">
              <img 
                src={scan.image} 
                alt={scan.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </div>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex h-48 relative">
          {/* Image Section - Left Half */}
          <div className="w-1/2 relative">
            <img 
              src={scan.image} 
              alt={scan.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content Section - Right Half */}
          <div className="w-1/2 p-2 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{scan.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{scan.description}</p>
            </div>

            <Button 
              onClick={() => onScanStart(scan.id)}
              className="w-full bg-wellness-bright-green hover:bg-wellness-green-gradient text-white font-semibold py-2"
            >
              Start {scan.title.split(' ')[0]} Scan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScanTypeCard;
