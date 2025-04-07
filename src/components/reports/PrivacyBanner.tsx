
import { useState } from "react";
import { Shield, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PrivacyBannerProps {
  className?: string;
}

const PrivacyBanner = ({ className }: PrivacyBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert className={`relative bg-blue-50 border-blue-100 mb-6 ${className}`}>
      <div className="flex items-start">
        <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
        <AlertDescription className="text-blue-800">
          <p className="font-medium">Your privacy is our priority. All reports are locally processed and encoded.</p>
          <p className="text-sm mt-1 text-blue-700">No personal data is saved or shared with third parties.</p>
        </AlertDescription>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 text-blue-400 hover:text-blue-700"
        aria-label="Close privacy banner"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
};

export default PrivacyBanner;
