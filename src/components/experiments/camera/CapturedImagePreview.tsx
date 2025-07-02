
import { Button } from "@/components/ui/button";

interface CapturedImagePreviewProps {
  imageData: string;
  onRetake: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

const CapturedImagePreview = ({ imageData, onRetake, onConfirm }: CapturedImagePreviewProps) => {
  return (
    <div className="space-y-4">
      <img 
        src={imageData} 
        alt="Captured image" 
        className="w-full h-64 object-cover rounded-lg" 
      />
      <div className="flex gap-4">
        <Button variant="outline" onClick={onRetake} className="flex-1">
          Retake
        </Button>
        <Button onClick={onConfirm} className="flex-1">
          Use Photo
        </Button>
      </div>
    </div>
  );
};

export default CapturedImagePreview;
