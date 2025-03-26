import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  AlertTriangle,
  User,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useGetUserSelectedSubscription } from "@/service/hooks/subscription/useUserSubscription";

const AccountTab = ({ getProfileIsData }) => {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);
  const [isAccountExpanded, setIsAccountExpanded] = useState(true);

  const {
    data: selectedSubscriptionCatalogData,
    isSuccess: selectedSubscriptionCatalogIsSuccess,
    isError: selectedSubscriptionCatalogIsError,
    refetch: selectedSubscriptionCatalogRefetch,
  } = useGetUserSelectedSubscription(true);

  const handleLogout = () => {
    // Placeholder for logout functionality
    localStorage.clear();
    toast.success("Successfully logged out");
    setTimeout(() => navigate("/"), 1500);
  };

  const handleDeleteData = () => {
    // Placeholder for data deletion
    toast.success("Health data has been deleted");
    setOpenDeleteDialog(null);
  };

  const handleDeleteAccount = () => {
    // Placeholder for account deletion
    toast.success("Account has been deleted");
    setOpenDeleteDialog(null);
    setTimeout(() => navigate("/"), 1500);
  };

  const navigateToSubscriptionPlans = () => {
    console.log("Navigating to subscription plans");
    navigate("/subscription-plans");
  };

  const toggleAccount = () => {
    setIsAccountExpanded(!isAccountExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Profile Management Section */}
      <Card className="rounded-xl overflow-hidden shadow-sm">
        <CardHeader className="py-4 border-b border-gray-100">
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5 text-wellness-bright-green" />
            Profile Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div
            className="flex justify-between items-center mb-2 cursor-pointer"
            onClick={toggleAccount}
          >
            <h3 className="text-lg font-medium text-gray-800">
              Account Details
            </h3>
            <button className="text-gray-400">
              {isAccountExpanded ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>

          {isAccountExpanded && (
            <div className="mt-3">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-wellness-light-green flex-shrink-0 mr-3">
                  <img
                    src="/lovable-uploads/b53703fa-3d8b-4f5f-9ff3-a4b1773d5701.png"
                    alt="John Doe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {getProfileIsData?.fullName || "john doe"}
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Mail size={14} className="mr-1" />
                    <span> {getProfileIsData?.email || "john doe"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Subscription Section */}
          <div className="mt-4 p-4 bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="text-gray-600 mr-2" size={20} />
                <h3 className="text-lg font-medium text-gray-800">
                  Subscription Plan
                </h3>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {selectedSubscriptionCatalogData?.name}
              </div>
            </div>

            <div className="mt-3">
              <Button
                variant="outline"
                className="mt-2 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={navigateToSubscriptionPlans}
              >
                View Plan Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Security & Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>

          <div className="mt-6">
            <div className="rounded-md border border-red-200 p-4 bg-red-50">
              <h3 className="font-medium text-red-800 mb-2 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                Danger Zone
              </h3>

              <div className="space-y-3 mt-4">
                <Dialog
                  open={openDeleteDialog === "data"}
                  onOpenChange={(open) =>
                    open
                      ? setOpenDeleteDialog("data")
                      : setOpenDeleteDialog(null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white text-red-600 hover:bg-red-50 w-full justify-start"
                    >
                      Delete My Health Data
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-red-600">
                        Delete Health Data
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete all your health records, measurements, and
                        activity history.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button
                        variant="outline"
                        onClick={() => setOpenDeleteDialog(null)}
                      >
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteData}>
                        Yes, Delete My Data
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={openDeleteDialog === "account"}
                  onOpenChange={(open) =>
                    open
                      ? setOpenDeleteDialog("account")
                      : setOpenDeleteDialog(null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-white text-red-600 hover:bg-red-50 w-full justify-start"
                    >
                      Delete My Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-red-600">
                        Delete Account
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account, all your data, and remove your
                        access to the service.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button
                        variant="outline"
                        onClick={() => setOpenDeleteDialog(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleDeleteAccount}
                      >
                        Yes, Delete My Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountTab;
