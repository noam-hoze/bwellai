import { useState } from "react";
import { RotateCcw, RotateCw, Plus, Minus, Heart, Brain, Bone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const bodyImageUrl = "/lovable-uploads/cb2ddbda-4493-49aa-9cd5-cb3e497afeed.png";

// System types for the body model
const bodySystems = [
  { id: "circulatory", name: "Circulatory", icon: Heart },
  { id: "nervous", name: "Nervous", icon: Brain },
  { id: "respiratory", name: "Respiratory", icon: Heart },
  { id: "skeletal", name: "Skeletal", icon: Bone },
];

const BodyModelEnhanced = () => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [selectedSystem, setSelectedSystem] = useState("circulatory");
  const [selectedRegion, setSelectedRegion] = useState({
    name: "Heart",
    metrics: [
      { name: "Resting Heart Rate", value: 68, unit: "bpm", normal: "60-100", status: "good" },
      { name: "Blood Pressure", value: "118/78", unit: "mmHg", normal: "<120/80", status: "good" },
      { name: "Oxygen Saturation", value: 98, unit: "%", normal: "95-100", status: "good" },
    ],
    recommendations: [
      "Continue regular cardiovascular exercise",
      "Maintain your balanced diet rich in omega-3",
      "Consider meditation to further improve HRV"
    ],
    trendData: [65, 67, 64, 66, 68, 65, 67, 69, 68, 70, 68, 66, 67, 68, 69, 67, 66, 68, 67, 68, 69, 67, 68, 69, 70, 68, 68, 69, 68, 68]
  });

  const handleRotateLeft = () => {
    setRotation(prev => prev - 45);
  };

  const handleRotateRight = () => {
    setRotation(prev => prev + 45);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 20, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 20, 60));
  };

  const handleSystemChange = (system: string) => {
    setSelectedSystem(system);
  };

  return (
    <div className="wellness-card p-4 mb-8">
      <h3 className="text-lg font-semibold mb-4">Enhanced Body Model</h3>

      <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
        {/* Left Panel - 3D Body Model */}
        <ResizablePanel defaultSize={40}>
          <div className="relative h-full flex flex-col">
            {/* System Selector - Moved to the top from the bottom */}
            <div className="mb-4">
              <Tabs 
                defaultValue="circulatory"
                value={selectedSystem}
                onValueChange={handleSystemChange}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 w-full h-auto p-1.5">
                  {bodySystems.map(system => (
                    <TabsTrigger 
                      key={system.id} 
                      value={system.id}
                      className="flex flex-col items-center py-2 px-3 h-full"
                    >
                      <system.icon className="mb-1 h-4 w-4" />
                      <span className="text-xs">{system.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex-1 relative">
              <div 
                className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-500"
                style={{ 
                  backgroundImage: `url(${bodyImageUrl})`,
                  transform: `rotate(${rotation}deg) scale(${zoom/100})`,
                  transformOrigin: 'center center'
                }}
              />
              
              {/* Heat Map Overlay - This would be dynamic in a real implementation */}
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 600"
                style={{ transform: `rotate(${rotation}deg) scale(${zoom/100})`, transformOrigin: 'center center' }}
              >
                <circle cx="200" cy="150" r="30" fill="rgba(46, 213, 115, 0.3)" />
                <circle cx="200" cy="220" r="40" fill="rgba(255, 193, 7, 0.3)" />
                <circle cx="150" cy="250" r="25" fill="rgba(46, 213, 115, 0.3)" />
                <circle cx="250" cy="250" r="25" fill="rgba(46, 213, 115, 0.3)" />
                <circle cx="200" cy="350" r="50" fill="rgba(46, 213, 115, 0.3)" />
              </svg>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-between mt-4">
              <div className="space-x-2">
                <Button 
                  onClick={handleRotateLeft} 
                  variant="outline" 
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleRotateRight} 
                  variant="outline" 
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-x-2">
                <Button 
                  onClick={handleZoomOut} 
                  variant="outline" 
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleZoomIn} 
                  variant="outline" 
                  size="sm"
                  className="rounded-full w-8 h-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel - Detailed Metrics */}
        <ResizablePanel defaultSize={35}>
          <div className="h-full p-4">
            <h4 className="text-lg font-medium mb-3">{selectedRegion.name} Metrics</h4>
            
            <div className="space-y-4">
              {selectedRegion.metrics.map((metric, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{metric.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        metric.status === "good" ? "bg-green-100 text-green-800" :
                        metric.status === "caution" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {metric.status === "good" ? "Good" : 
                         metric.status === "caution" ? "Caution" : "Alert"}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">{metric.value}</span>
                      <span className="text-gray-500 text-sm">{metric.unit}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Normal range: {metric.normal}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* 30-Day Trend Graph */}
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <h5 className="text-sm font-medium mb-2">30-Day Heart Rate Trend</h5>
                  <div className="h-24 w-full">
                    <svg viewBox="0 0 300 100" className="w-full h-full">
                      <polyline
                        fill="none"
                        stroke="#33D685"
                        strokeWidth="2"
                        points={selectedRegion.trendData.map((value, index) => 
                          `${index * 10}, ${100 - value}`
                        ).join(' ')}
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Health Overview and Recommendations */}
        <ResizablePanel defaultSize={25}>
          <div className="h-full p-4 flex flex-col">
            <h4 className="text-lg font-medium mb-3">Recommendations</h4>
            
            <div className="space-y-3 mb-6">
              {selectedRegion.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>

            <h4 className="text-lg font-medium mb-3 mt-auto">Achievements</h4>
            <div className="bg-wellness-light-green p-4 rounded-lg">
              <h5 className="font-medium text-wellness-bright-green mb-2">Heart Health Champion</h5>
              <p className="text-sm mb-3">Your heart metrics have been optimal for 30+ days</p>
              <Button variant="secondary" size="sm" className="w-full">
                View All Achievements
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default BodyModelEnhanced;
