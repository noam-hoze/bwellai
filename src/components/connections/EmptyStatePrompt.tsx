
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, ArrowRight } from "lucide-react";

interface EmptyStatePromptProps {
  onConnect: () => void;
}

const EmptyStatePrompt = ({ onConnect }: EmptyStatePromptProps) => {
  return (
    <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-2">
          <Link2 className="h-8 w-8 text-blue-500" />
        </div>
        <CardTitle className="text-xl">No Connections Yet</CardTitle>
        <CardDescription className="text-gray-500">
          Connect your devices and apps to get the most out of your health journey
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center space-y-4 px-4 sm:px-8">
        <div className="bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
          <h3 className="font-medium text-blue-700 mb-2">Did you know?</h3>
          <p className="text-sm text-gray-600">
            Users who connect devices are <strong>3x more likely</strong> to reach their health goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="font-medium mb-1">Step 1</div>
            <p className="text-xs text-gray-500">Choose a device or app to connect</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="font-medium mb-1">Step 2</div>
            <p className="text-xs text-gray-500">Authorize with a single tap</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="font-medium mb-1">Step 3</div>
            <p className="text-xs text-gray-500">Select what data to import</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-center pt-2 pb-6">
        <Button 
          onClick={onConnect} 
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8"
        >
          Connect Your First Device
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmptyStatePrompt;
