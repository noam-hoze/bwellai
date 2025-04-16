import { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Coins,
  Send,
  Gift,
  Plus,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useGetCreateUserWalletData,
  useGetUserWalletData,
  useGetUserWalletTransaction,
} from "@/service/hooks/wallet/useGetUserWalletData";
import { Navigate, useNavigate } from "react-router-dom";
import { handleCopyToClipboard } from "@/utils/utils";
import BalanceCard from "@/components/wallet/BalanceCard";
import { useAuth } from "@/contexts/AuthContext";

const actionMap = {
  ADD_MONEY: "Earned",
  BURN: "Spent",
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const Wallet = () => {
  const { isAuthenticated, loading } = useAuth();

  const size = 10;
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(
    null
  );

  const {
    data: userWalletData,
    isError: userWalletDataIsError,
    isSuccess: userWalletDataIsSuccess,
    isLoading: userWalletDataLoading,
  } = useGetUserWalletData({ isAuthenticated: true });

  const {
    data: userCreateWalletData,
    isError: userCreateWalletDataIsError,
    isSuccess: userCreateWalletDataIsSuccess,
    mutate: userCreateWalletDataMutate,
  } = useGetCreateUserWalletData();

  const {
    data: walletTransactionData,
    // isLoading: walletTransactionLoading,
    isError: walletTransactionIsError,
  } = useGetUserWalletTransaction(size, page, true);

  // Toggle transaction details
  const toggleTransactionDetails = (id: number) => {
    if (expandedTransaction === id) {
      setExpandedTransaction(null);
    } else {
      setExpandedTransaction(id);
    }
  };

  const transactionIconMap = {
    "login bonus": <Award className="text-wellness-bright-green" />,
    "label scanned bonus": <Coins className="text-wellness-bright-green" />,
    "selected date bonus": (
      <ArrowUpRight className="text-wellness-bright-green" />
    ),
    "uploaded bonus": <Coins className="text-wellness-bright-green" />,
    "Inactivity Penalty Charge": (
      <ArrowDownRight className="text-wellness-deep-orange" />
    ),
    "Gift to Friend": <Send className="text-wellness-deep-orange" />,
  };

  // Mock data for transactions with enhanced information
  const transactions = [
    {
      id: 1,
      type: "earned",
      name: "Daily Login Bonus",
      description: "Completed your daily login streak",
      detailedDescription:
        "You've logged in for 7 consecutive days and received your weekly bonus!",
      amount: 50,
      date: new Date(2023, 5, 10, 8, 30),
      icon: <Award className="text-wellness-bright-green" />,
      status: "completed",
      provider: "BWellAI Rewards",
      providerLink: "#",
      transactionId: "TRX-2023061001",
      category: "engagement",
    },
    {
      id: 2,
      type: "earned",
      name: "Meal Analysis Completed",
      description: "Analyzed your lunch with AI",
      detailedDescription:
        "You received coins for using our AI to analyze the nutritional content of your lunch meal.",
      amount: 75,
      date: new Date(2023, 5, 9, 13, 45),
      icon: <Coins className="text-wellness-bright-green" />,
      status: "completed",
      provider: "BWellAI Nutrition",
      providerLink: "#",
      transactionId: "TRX-2023060902",
      category: "nutrition",
    },
    {
      id: 3,
      type: "spent",
      name: "Premium Report Unlock",
      description: "Unlocked your quarterly health analysis",
      detailedDescription:
        "You spent coins to access the premium quarterly health analysis report with detailed insights.",
      amount: -150,
      date: new Date(2023, 5, 8, 15, 20),
      icon: <ArrowDownRight className="text-wellness-deep-orange" />,
      status: "completed",
      provider: "BWellAI Reports",
      providerLink: "#",
      transactionId: "TRX-2023060803",
      category: "premium",
    },
    {
      id: 4,
      type: "earned",
      name: "Weekly Step Goal",
      description: "Reached 70,000 steps this week",
      detailedDescription:
        "Congratulations! You achieved your weekly step target of 70,000 steps and earned bonus coins.",
      amount: 100,
      date: new Date(2023, 5, 7, 21, 10),
      icon: <ArrowUpRight className="text-wellness-bright-green" />,
      status: "completed",
      provider: "BWellAI Fitness",
      providerLink: "#",
      transactionId: "TRX-2023060704",
      category: "fitness",
    },
    {
      id: 5,
      type: "spent",
      name: "Gift to Friend",
      description: "Shared coins with @sarah_fitness",
      detailedDescription:
        "You shared some of your wellness coins with your friend Sarah to help them unlock premium features.",
      amount: -50,
      date: new Date(2023, 5, 6, 12, 0),
      icon: <Send className="text-wellness-deep-orange" />,
      status: "completed",
      provider: "BWellAI Social",
      providerLink: "#",
      transactionId: "TRX-2023060605",
      category: "social",
    },
  ];

  const previousPageHandler = () => {
    setPage((prevPage) => {
      return (prevPage = prevPage - 1);
    });
  };

  const nextPageHandler = () => {
    setPage((prevPage) => {
      return (prevPage = prevPage + 1);
    });
  };

  const disableNextPage =
    page + 1 >= Math.ceil(walletTransactionData?.page?.totalItemCount / size);

  // Filter transactions based on the active tab
  const filteredTransactions = walletTransactionData?.content.filter(
    (transaction) => {
      if (activeTab === "all") return true;
      return transaction.actionType === activeTab;
    }
  );

  // Format date to a readable string
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Format time to a readable string
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (!loading && !isAuthenticated) {
    return <Navigate to="/onboarding/0" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Wellness Wallet</h1>

        {/* Balance Card */}
        <BalanceCard />

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Button
            className="h-auto py-4 flex flex-col items-center gap-1 bg-[#ffe4e6] hover:bg-[#ffe4e6]/80 text-wellness-bright-green"
            variant="secondary"
          >
            <Coins size={24} />
            <span>Earn Coins</span>
          </Button>

          <Button
            className="h-auto py-4 flex flex-col items-center gap-1 bg-[#dcfce7] hover:bg-[#dcfce7]/80 text-wellness-bright-green"
            variant="secondary"
          >
            <Send size={24} />
            <span>Send Coins</span>
          </Button>

          <Button
            className="h-auto py-4 flex flex-col items-center gap-1 bg-[#f3e8ff] hover:bg-[#f3e8ff]/80 text-wellness-bright-green"
            variant="secondary"
          >
            <Plus size={24} />
            <span>Get More</span>
          </Button>

          <Button
            className="h-auto py-4 flex flex-col items-center gap-1 bg-[#fff3c7] hover:bg-[#fff3c7]/80 text-wellness-bright-green"
            variant="secondary"
          >
            <Gift size={24} />
            <span>Redeem</span>
          </Button>
        </div>

        {/* Daily Opportunity Card */}
        <Card className="mb-6 bg-wellness-light-green/30 border-wellness-light-green">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="mr-2 text-wellness-bright-green" />
              Daily Opportunity
            </CardTitle>
            <CardDescription>Scan your lunch to earn 50 coins</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              size="sm"
              className="w-full"
              onClick={() => navigate("/nutrition")}
            >
              SCAN NOW
            </Button>
          </CardFooter>
        </Card>

        {/* Wallet ID Card */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Secure Wallet ID</CardTitle>
            <CardDescription>
              Your unique identifier for BWellAI transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-3 rounded-md flex items-center justify-between">
              <code className="text-sm font-mono">
                {userWalletData?.ethAddress}
              </code>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleCopyToClipboard(userWalletData?.ethAddress)
                  }
                >
                  <Copy size={16} />
                </Button>

                <a
                  href={`https://amoy.polygonscan.com/address/${userWalletData?.ethAddress}`}
                  target="_blank"
                  className="bg-muted rounded-md flex items-center justify-between"
                >
                  <Button variant="ghost" size="sm">
                    <ExternalLink size={16} />
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Coin Activity</h2>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="ADD_MONEY">Earned</TabsTrigger>
              <TabsTrigger value="BURN">Spent</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredTransactions?.length > 0 ? (
                filteredTransactions?.map((transaction) => (
                  <Card key={transaction?.id} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-muted rounded-full p-2">
                            {transactionIconMap?.[transaction?.description]}
                          </div>
                          <div>
                            <h4 className="font-medium">
                              {toTitleCase(transaction?.description)}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {actionMap?.[transaction?.actionType]}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <p className="text-xs text-muted-foreground">
                                {formatDate(new Date(transaction?.createdAt))}{" "}
                                at{" "}
                                {formatTime(new Date(transaction?.createdAt))}
                              </p>
                              {transaction.status === "SUCCESS" && (
                                <Badge variant="success" className="text-xs">
                                  Success
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div
                            className={cn(
                              "text-lg font-semibold",
                              Number(transaction?.amount) > 0
                                ? "text-wellness-bright-green"
                                : "text-wellness-deep-orange"
                            )}
                          >
                            {Number(transaction?.amount) > 0 ? "+" : ""}
                            {Number(transaction?.amount)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs mt-1 h-7 px-2"
                            onClick={() =>
                              toggleTransactionDetails(transaction?.id)
                            }
                          >
                            {expandedTransaction === transaction?.id ? (
                              <span className="flex items-center">
                                Hide details{" "}
                                <ChevronUp className="ml-1 h-3 w-3" />
                              </span>
                            ) : (
                              <span className="flex items-center">
                                Show details{" "}
                                <ChevronDown className="ml-1 h-3 w-3" />
                              </span>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {expandedTransaction === transaction.id && (
                        <div className="mt-4 pt-4 border-t border-muted-foreground/10 animate-fade-in">
                          <p className="text-sm mb-3">
                            {transaction.detailedDescription}
                          </p>
                          <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="text-muted-foreground">
                              Category:
                            </div>
                            <div className="font-medium capitalize">
                              {transaction.actionType}
                            </div>

                            <div className="text-muted-foreground">
                              Transaction ID:
                            </div>
                            <div className="font-medium">
                              {transaction.thirdPartyTransactionId}
                            </div>

                            <div className="text-muted-foreground">
                              Provider:
                            </div>
                            <div className="font-medium">Polygon</div>
                          </div>

                          <Button
                            variant="link"
                            size="sm"
                            className="mt-3 p-0 h-auto text-wellness-bright-green"
                            onClick={() =>
                              window.open(
                                transaction?.thirdPartyChainUrl,
                                "_blank"
                              )
                            }
                          >
                            <span className="flex items-center">
                              View transaction at provider{" "}
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No transactions found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-center gap-3 hover:bg mt-5">
            <Button
              variant="outline"
              size="sm"
              onClick={previousPageHandler}
              disabled={page <= 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPageHandler}
              disabled={disableNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Wallet;
