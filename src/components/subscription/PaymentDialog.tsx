import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Tag, Wallet } from "lucide-react";
import {
  useGetAddUserSelectedSubscription,
  useGetSubscriptionPaymentCheckoutPage,
} from "@/service/hooks/subscription/useUserSubscription";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  planTokens?: number;
  walletBalanceData?;
  setIsSuccessDialogOpen?;
  selectedPlanId?;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  isOpen,
  onClose,
  planName,
  planPrice,
  planTokens,
  walletBalanceData,
  setIsSuccessDialogOpen,
  selectedPlanId,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(
    undefined
  );
  const [promoCode, setPromoCode] = useState("");
  const [showPromoInput, setShowPromoInput] = useState(false);

  const {
    data: addSelectedSubscriptionData,
    isError: addSelectedSubscriptionCatalogIsError,
    error: addSelectedSubscriptionCatalogError,
    isSuccess: addSelectedSubscriptionCatalogIsSuccess,
    mutate: addSelectedSubscriptionCatalogMutate,
  } = useGetAddUserSelectedSubscription();

  const {
    data: getSubscriptionPaymentCheckoutPageData,
    // isError: getSubscriptionPaymentCheckoutPageIsError,
    // error: getSubscriptionPaymentCheckoutPageError,
    isSuccess: getSubscriptionPaymentCheckoutPagesSuccess,
    mutate: getSubscriptionPaymentCheckoutPageMutate,
  } = useGetSubscriptionPaymentCheckoutPage();

  useEffect(() => {
    if (
      addSelectedSubscriptionData &&
      addSelectedSubscriptionCatalogIsSuccess
    ) {
      // Close the dialog after payment processing
      setIsSuccessDialogOpen(true);
      onClose();
    }
  }, [addSelectedSubscriptionData, addSelectedSubscriptionCatalogIsSuccess]);

  useEffect(() => {
    if (
      getSubscriptionPaymentCheckoutPagesSuccess &&
      getSubscriptionPaymentCheckoutPageData?.sessionUrl
    ) {
      window.location.href = getSubscriptionPaymentCheckoutPageData?.sessionUrl;
    }
  }, [
    getSubscriptionPaymentCheckoutPagesSuccess,
    getSubscriptionPaymentCheckoutPageData,
  ]);

  // Mocked available tokens - in a real app, this would come from a user's account

  const handleConfirm = () => {
    // Here you would integrate with a payment processor or token system
    if (promoCode?.length > 3) {
      addSelectedSubscriptionCatalogMutate({
        promo_code: promoCode,
        subscription_id: selectedPlanId,
        currencyType: "PROMO",
        promoDetails: {},
      });
    } else {
      if (paymentMethod === "credit-card") {
        getSubscriptionPaymentCheckoutPageMutate({
          subscriptionId: selectedPlanId,
          paymentType: "PG",
          currencyType: "USD",
        });
      }

      if (paymentMethod === "tokens") {
        addSelectedSubscriptionCatalogMutate({
          promo_code: promoCode,
          subscription_id: selectedPlanId,
          currencyType: "BWELLAI_TOKEN",
          promoDetails: {},
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose Payment Option</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6">
            <div
              className="flex items-center mb-4 cursor-pointer"
              onClick={() => setShowPromoInput(!showPromoInput)}
            >
              <div
                className={`w-6 h-6 rounded-full border ${
                  showPromoInput ? "bg-gray-300" : "bg-gray-100"
                } flex items-center justify-center mr-3`}
              >
                <Tag className="h-4 w-4 text-gray-500" />
              </div>
              <span className="text-lg text-gray-700">Enter Promo Code</span>
            </div>

            {showPromoInput && (
              <div className="ml-9 mb-4">
                <Input
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    if (e.target.value?.length > 3) {
                      setPaymentMethod("promo");
                    } else {
                      setPaymentMethod("");
                    }
                  }}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="space-y-4"
          >
            {/* <div className="flex items-center space-x-3 border p-4 rounded-md cursor-pointer">
              <input
                type="radio"
                id="promo"
                value="promo"
                checked={paymentMethod === "promo"}
                onChange={() => setPaymentMethod("promo")}
                className="h-5 w-5 text-blue-600"
              />
              <Label htmlFor="promo" className="flex-1 cursor-pointer">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-lg">Pay with credit card</span>
                </div>
              </Label>
            </div> */}

            <div className="flex items-center space-x-3 border p-4 rounded-md cursor-pointer">
              <input
                type="radio"
                id="tokens"
                value="tokens"
                checked={paymentMethod === "tokens"}
                onChange={() => {
                  setPaymentMethod("tokens");
                  setPromoCode("");
                }}
                className="h-5 w-5 text-blue-600"
                disabled={
                  planTokens >=
                  parseInt(walletBalanceData?.balances?.[0]?.balance)
                }
              />
              <Label htmlFor="tokens" className="flex-1 cursor-pointer">
                <div className="flex items-center">
                  <Wallet className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-lg">
                    Use BWellAi Tokens - (Available BWellAi tokens:{" "}
                    {walletBalanceData?.balances?.[0]?.balance})
                  </span>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 border p-4 rounded-md cursor-pointer">
              <input
                type="radio"
                id="credit-card"
                value="credit-card"
                checked={paymentMethod === "credit-card"}
                onChange={() => {
                  setPaymentMethod("credit-card");
                  setPromoCode("");
                }}
                className="h-5 w-5 text-blue-600"
              />
              <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                <div className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="text-lg">Pay with credit card</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="border-t pt-4">
          <div className="text-sm text-gray-500 mb-4">
            {planTokens ? (
              <p>
                You are subscribing to {planName} for {planTokens} tokens or $
                {planPrice}.
              </p>
            ) : (
              <p>
                You are subscribing to {planName} for ${planPrice}.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-purple-600 hover:text-purple-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!paymentMethod}
            className="bg-green-600 hover:bg-green-700"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
