import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Star, Info, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PaymentDialog from "@/components/subscription/PaymentDialog";
import { useGetUserSubscriptionCatalog } from "@/service/hooks/subscription/useUserSubscription";
import { useGetUserWalletBalance } from "@/service/hooks/wallet/useGetUserWalletData";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const plansFeatures = {
  alternative_perspectives: "Alternative Perspectives",
  diagnostics_report_upload: "Diagnostics Report Upload",
  food_barcode_scan: "food Barcode Scan",
  food_image_scan: "Food Image Scan",
  risk_calculator: "Risk Calculator",
};

const planToExtraDetails = {
  Free: {
    name: "Free Plan",
    price: "$0",
    color: "#6c757d",
    features: [
      { name: "Diagnostics Report Uploads", value: "Up to 3 / month" },
      { name: "Health Risk Assessments", value: "Up to 3 / month" },
      { name: "Food Image Scans", value: "Up to 10 / month" },
      { name: "Barcode Scans", value: "Up to 3 / month" },
      { name: "Alternative Health Insights", value: "Not included" },
      { name: "How to Join", value: "No signup needed" },
    ],
    popular: false,
    buttonText: "Start Free",
    developmentStage: "Early Access",
  },
  Premium: {
    name: "Premium Plan",
    price: "$10 / month",
    tokenOption: "100 TOKENS",
    color: "#007bff",
    features: [
      { name: "Diagnostics Report Uploads", value: "Up to 10 / month" },
      { name: "Health Risk Assessments", value: "Up to 30 / month" },
      { name: "Food Image Scans", value: "Up to 100 / month" },
      { name: "Barcode Scans", value: "Up to 1,000 / month" },
      { name: "Alternative Health Insights", value: "25 insights / month" },
      { name: "How to Join", value: "Activate Plan" },
    ],
    popular: true,
    buttonText: "Upgrade to Premium",
    developmentStage: "Innovation Phase",
  },
  Pro: {
    name: "Pro Plan",
    price: "$100 / month",
    tokenOption: "1000 TOKENS",
    color: "#28a745",
    features: [
      { name: "Diagnostics Report Uploads", value: "Unlimited" },
      { name: "Health Risk Assessments", value: "Unlimited" },
      { name: "Food Image Scans", value: "Unlimited" },
      { name: "Barcode Scans", value: "Unlimited" },
      { name: "Alternative Health Insights", value: "Unlimited" },
      { name: "How to Join", value: "Activate Plan" },
    ],
    popular: false,
    buttonText: "Go Pro",
    developmentStage: "Innovation Phase",
  },
  Beta: {
    name: "Beta Tester Plan",
    price: "Free",
    subtitle: "in exchange for feedback",
    color: "#6f42c1",
    features: [
      { name: "Diagnostics Report Uploads", value: "Up to 10 / month" },
      { name: "Health Risk Assessments", value: "Up to 30 / month" },
      { name: "Food Image Scans", value: "Up to 100 / month" },
      { name: "Barcode Scans", value: "Up to 1,000 / month" },
      { name: "Alternative Health Insights", value: "25 insights / month" },
      {
        name: "How to Join",
        value: "Submit feedback weekly + one monthly call",
      },
    ],
    popular: false,
    buttonText: "Join Beta Program",
    developmentStage: "Beta Testing",
  },
};

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const {
    data: subscriptionCatalogData,
    isSuccess: subscriptionCatalogIsSuccess,
  } = useGetUserSubscriptionCatalog();

  const {
    data: walletBalanceData,
    // isError: walletBalanceIsError,
    // isLoading: walletBalanceIsLoading,
  } = useGetUserWalletBalance({
    refetchIntervalInBackground: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
  });

  const handlePlanSelection = (plan) => {
    setSelectedPlan({
      name: plan.name,
      price: plan.price,
      tokenOption: plan.bwellTokenPrice,
      id: plan.id,
    });
  };

  const handleCloseDialog = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/profile")}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Wellness Journey
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Select the plan that best fits your health improvement goals
          </p>
          <div className="bg-blue-50 p-4 rounded-lg inline-block mt-2">
            <p className="text-lg text-blue-800 flex items-center justify-center">
              <Rocket className="mr-2 h-5 w-5" />
              <span className="font-bold">Innovation Phase:</span> We're still
              developing! Your support helps us grow.
            </p>
            <p className="text-blue-700 mt-1">
              Earn tokens by using the app or invest directly to unlock premium
              features.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionCatalogData?.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 ${
                planToExtraDetails?.[plan.name].popular
                  ? "border-4 border-blue-500"
                  : "border border-gray-200"
              }`}
            >
              {planToExtraDetails?.[plan.name].popular && (
                <div className="bg-blue-500 text-white text-center py-1 font-semibold flex items-center justify-center">
                  <Star className="mr-1 h-4 w-4" />
                  MOST POPULAR
                </div>
              )}

              <div className="p-6 bg-white">
                <div className="mb-2">
                  <Badge
                    variant="outline"
                    className="w-full justify-center text-xs font-medium"
                    style={{
                      color: planToExtraDetails?.[plan.name]?.color,
                      borderColor: planToExtraDetails?.[plan.name]?.color,
                    }}
                  >
                    {planToExtraDetails?.[plan.name].developmentStage}
                  </Badge>
                </div>

                <div className="text-center">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: planToExtraDetails?.[plan.name]?.color }}
                  >
                    {plan?.name}
                  </h2>
                  <div className="mt-4 mb-2">
                    {plan?.bwellTokenPrice && plan?.name !== "Beta" ? (
                      <>
                        <div
                          className="text-3xl font-bold"
                          style={{
                            color: planToExtraDetails?.[plan.name]?.color,
                          }}
                        >
                          {plan.bwellTokenPrice} Tokens
                        </div>
                        <div className="text-sm font-medium text-gray-600 mt-1">
                          or ${plan.price}
                        </div>
                      </>
                    ) : (
                      <div className="text-3xl font-bold text-gray-800">
                        {plan?.name !== "Beta" ? `"$"${plan.price}` : "Free"}
                      </div>
                    )}
                    {plan.description && (
                      <div className="text-sm text-gray-500 mt-1">
                        {plan.description}
                      </div>
                    )}
                  </div>
                </div>

                {(plan.name === "Premium" || plan.name === "Pro") && (
                  <div className="bg-gray-50 p-3 rounded-lg text-center text-sm text-gray-700 mb-4 flex items-start">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5 mr-2 shrink-0" />
                    <p>
                      Earn tokens by completing activities and health challenges
                      within the app!
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {Object.entries(plan?.features)?.map(
                    ([key, value]: [string, number], idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                        <div>
                          <span className="font-medium text-gray-700">
                            {plansFeatures?.[key]}
                          </span>
                          <span className="text-gray-600">
                            {value === 999
                              ? " unlimited"
                              : ` : Up to ${value} / month`}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-6">
                  <button
                    className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200"
                    style={{
                      backgroundColor: planToExtraDetails?.[plan.name]?.color,
                    }}
                    onClick={() => handlePlanSelection(plan)}
                  >
                    {planToExtraDetails?.[plan.name]?.buttonText}
                  </button>

                  {(plan.name === "Premium" || plan.name === "Pro") && (
                    <div className="text-center text-sm text-gray-600 mt-2">
                      {plan.name === "Premium"
                        ? "Support our innovation phase"
                        : "Invest in our future development"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">
              Why Support Us During Development?
            </h3>
            <p className="text-gray-700">
              Your early investment helps us improve the app and develop new
              features.
            </p>
            <p className="text-gray-700 mt-1">
              Plus, early supporters will receive exclusive benefits once we
              fully launch!
            </p>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      {selectedPlan && (
        <PaymentDialog
          isOpen={!!selectedPlan}
          onClose={handleCloseDialog}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          planTokens={selectedPlan.bwellTokenPrice}
          selectedPlanId={selectedPlan.id}
          walletBalanceData={walletBalanceData}
          setIsSuccessDialogOpen={setIsSuccessDialogOpen}
        />
      )}

      <Dialog
        open={isSuccessDialogOpen}
        onOpenChange={(open) => !open && setIsSuccessDialogOpen(false)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Success</DialogTitle>
          </DialogHeader>

          <p>Subscription Activated</p>

          <DialogFooter className="flex justify-end sm:justify-end">
            <Button
              variant="ghost"
              onClick={() => setIsSuccessDialogOpen(false)}
              className="text-purple-600 hover:text-purple-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionPlans;
