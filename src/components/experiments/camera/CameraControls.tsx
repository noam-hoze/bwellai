
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload from "./FileUpload";

interface CameraControlsProps {
  onCapture: () => void;
  onFileSelect: (imageData: string) => void;
}

const CameraControls = ({ onCapture, onFileSelect }: CameraControlsProps) => {
  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      onFileSelect(imageData);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <div className="flex gap-4 w-full justify-center">
        <Button 
          variant="default" 
          size="lg" 
          className="rounded-full w-16 h-16 p-0 bg-green-600 hover:bg-green-700"
          onClick={onCapture}
        >
          <Camera className="h-8 w-8" />
        </Button>
        <FileUpload onFileSelect={handleFileSelect} />
      </div>
      <p className="text-center text-gray-500 text-sm">
        Take a photo or upload an image
      </p>
    </div>
  );
};

export default CameraControls;
