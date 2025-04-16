
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const MessagesCenter = () => {
  const messages = [
    {
      from: "Dr. Smith",
      message: "Your recent blood work looks good. Let's discuss at your next visit.",
      time: "2 hours ago"
    },
    {
      from: "Nutritionist Sarah",
      message: "Great progress with your meal plan! Keep up the good work.",
      time: "Yesterday"
    }
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Messages</CardTitle>
        <MessageSquare className="h-5 w-5 text-purple-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className="p-3 rounded-lg bg-gray-50 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{message.from}</span>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-sm text-gray-600">{message.message}</p>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Reply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesCenter;
