import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Shield } from "lucide-react";
import { useGetUserSubscriptionQuota } from "@/service/hooks/subscription/useUserSubscription";
import { useAuth } from "@/contexts/AuthContext";

interface CreditLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const getColor = (useCount, useLimit) => {
  const value = Math.round((useCount / useLimit) * 100);
  if (value >= 0 && value <= 33) {
    return { color: "green", percentage: value };
  } else if (value > 33 && value <= 80) {
    return { color: "amber", percentage: value };
  } else if (value > 80 && value <= 100) {
    return { color: "red", percentage: value };
  } else {
    return { color: "gray", percentage: value };
  }
};

const CreditLimitModal: React.FC<CreditLimitModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const navigate = useNavigate();
  const [trigger, setTrigger] = useState(false);

  const { isAuthenticated } = useAuth();

  const {
    data: getUserSubscriptionQuotaData,
    isSuccess: getUserSubscriptionQuotaIsSuccess,
  } = useGetUserSubscriptionQuota(
    isAuthenticated,
    trigger,
    "diagnostics_report_upload"
  );

  const { color, percentage } = getColor(
    getUserSubscriptionQuotaData?.usageCount,
    getUserSubscriptionQuotaData?.usageLimit
  );

  const handleUpgrade = () => {
    navigate("/subscription-plans");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-amber-500" />
            Monthly Limit Reached
          </DialogTitle>
          <DialogDescription>
            You've used all 3 of your monthly report uploads
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Reports Used</span>
              <span className={`font-bold text-${color}-600`}>
                {getUserSubscriptionQuotaData?.usageCount}/
                {getUserSubscriptionQuotaData?.usageLimit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`bg-${color}-500 h-2.5 rounded-full`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Upgrade Benefits:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Unlimited report uploads</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Priority AI analysis</span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                <span>Access to all report types</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex sm:flex-row gap-2">
          {getUserSubscriptionQuotaData?.usageCount !==
            getUserSubscriptionQuotaData?.usageLimit && (
            <Button variant="outline" onClick={onContinue} className="flex-1">
              Continue Anyway
            </Button>
          )}
          <Button
            onClick={handleUpgrade}
            className="bg-green-600 hover:bg-green-700 flex-1"
          >
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreditLimitModal;
