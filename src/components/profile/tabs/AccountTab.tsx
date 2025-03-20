
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, AlertTriangle, User, CreditCard } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const AccountTab = () => {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<string | null>(null);

  const handleLogout = () => {
    // Placeholder for logout functionality
    toast.success("Successfully logged out");
    setTimeout(() => navigate('/'), 1500);
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
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Profile Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5 text-wellness-bright-green" />
            Profile Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="account-details">
              <AccordionTrigger className="font-medium">Account Details</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-wellness-light-green flex-shrink-0">
                    <img src="/lovable-uploads/b53703fa-3d8b-4f5f-9ff3-a4b1773d5701.png" alt="John Doe" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">John Doe</h3>
                    <p className="text-gray-500">john.doe@email.com</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-wellness-bright-green" />
                <h3 className="font-medium">Subscription Plan</h3>
              </div>
              <div className="bg-gray-100 px-3 py-1 rounded-full font-medium">Premium</div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm">View Plan Details</Button>
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
                <Dialog open={openDeleteDialog === 'data'} onOpenChange={(open) => open ? setOpenDeleteDialog('data') : setOpenDeleteDialog(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50 w-full justify-start">
                      Delete My Health Data
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-red-600">Delete Health Data</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete all your health records, measurements, and activity history.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button variant="outline" onClick={() => setOpenDeleteDialog(null)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteData}>
                        Yes, Delete My Data
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={openDeleteDialog === 'account'} onOpenChange={(open) => open ? setOpenDeleteDialog('account') : setOpenDeleteDialog(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50 w-full justify-start">
                      Delete My Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-red-600">Delete Account</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account, all your data, and remove your access to the service.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button variant="outline" onClick={() => setOpenDeleteDialog(null)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
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
