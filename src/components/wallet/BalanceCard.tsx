import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Coins } from "lucide-react";

import { useGetUserWalletBalance } from "@/service/hooks/wallet/useGetUserWalletData";
import { getNextGoalValue } from "@/utils/utils";

const BalanceCard = () => {
  const priceStepper = 500;
  const { data: walletBalanceData } = useGetUserWalletBalance({
    refetchIntervalInBackground: true,
    isAuthenticated: true,
  });

  return (
    <div>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="bg-wellness-bright-green w-12 h-12 rounded-full flex items-center justify-center mr-3">
                <Coins className="text-white h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">YOUR BALANCE</p>
                <h2 className="text-3xl font-bold">
                  {walletBalanceData?.balances?.[0]?.balance} Coins
                </h2>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">NEXT REWARD AT</p>
              <p className="font-medium">
                {getNextGoalValue({
                  current: walletBalanceData?.balances?.[0]?.balance,
                  skipValue: priceStepper,
                })}
                Coins
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span>Current: {walletBalanceData?.balances?.[0]?.balance}</span>
              <span>
                Goal:{" "}
                {getNextGoalValue({
                  current: walletBalanceData?.balances?.[0]?.balance,
                  skipValue: priceStepper,
                })}
              </span>
            </div>
            <Progress
              value={
                (walletBalanceData?.balances?.[0]?.balance /
                  getNextGoalValue({
                    current: walletBalanceData?.balances?.[0]?.balance,
                    skipValue: priceStepper,
                  })) *
                100
              }
              className="h-2"
            />
          </div>

          <div className="bg-wellness-light-green/50 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  THIS MONTH
                </p>
                <p className="text-xl font-semibold">+225 Coins earned</p>
              </div>
              <Calendar className="text-wellness-bright-green h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceCard;
