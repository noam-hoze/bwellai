
import { useState } from "react";
import { Shield, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const PrivacyIndicator = () => {
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

  return (
    <>
      <div 
        className="cursor-pointer flex items-center" 
        onClick={() => setShowPrivacyInfo(true)}
      >
        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200 flex items-center gap-1.5 py-1 px-2">
          <Shield className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Privacy Protected</span>
        </Badge>
      </div>

      <Dialog open={showPrivacyInfo} onOpenChange={setShowPrivacyInfo}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Our Privacy Commitment
            </DialogTitle>
            <DialogDescription>
              We take your data privacy and security seriously.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-2 text-sm">
            <div>
              <h3 className="font-medium mb-1">Local Processing</h3>
              <p className="text-gray-600">All your health reports are processed directly on your device. Personal identifiers are encoded before any data analysis.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">No Third-Party Sharing</h3>
              <p className="text-gray-600">We never share your personal health information with advertisers or data brokers.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">End-to-End Encryption</h3>
              <p className="text-gray-600">When syncing across your devices, your health data is protected with industry-standard encryption.</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Your Control</h3>
              <p className="text-gray-600">You can delete your data at any time from your account settings.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PrivacyIndicator;
