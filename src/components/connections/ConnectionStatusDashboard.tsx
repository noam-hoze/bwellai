
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ConnectionStats {
  active: number;
  recommended: number;
  inactive: number;
  totalAvailable: number;
}

interface ConnectionStatusDashboardProps {
  stats: ConnectionStats;
}

const ConnectionStatusDashboard = ({ stats }: ConnectionStatusDashboardProps) => {
  const connectionProgress = (stats.active / stats.totalAvailable) * 100;
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Connection Status</h2>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm text-gray-500">Connected</span>
              <h3 className="text-3xl font-bold">{stats.active} of {stats.totalAvailable}</h3>
              <p className="text-sm text-gray-500">available integrations active</p>
            </div>
            <div className="text-right">
              <Progress value={connectionProgress} className="w-[100px] h-2 mb-1" />
              <p className="text-sm text-gray-500">{Math.round(connectionProgress)}% connected</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-medium text-sm">Active</h4>
              <p className="text-2xl font-semibold mt-1">{stats.active}</p>
              <Badge variant="outline" className="mt-1 bg-green-50 text-green-600 border-green-200">
                Connected
              </Badge>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-2 mb-2 animate-pulse">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="font-medium text-sm">Recommended</h4>
              <p className="text-2xl font-semibold mt-1">{stats.recommended}</p>
              <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-600 border-blue-200">
                Suggested
              </Badge>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-gray-200 rounded-full p-2 mb-2">
                <AlertCircle className="h-5 w-5 text-gray-500" />
              </div>
              <h4 className="font-medium text-sm">Inactive</h4>
              <p className="text-2xl font-semibold mt-1">{stats.inactive}</p>
              <Badge variant="outline" className="mt-1 bg-gray-50 text-gray-600 border-gray-200">
                Disabled
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectionStatusDashboard;
