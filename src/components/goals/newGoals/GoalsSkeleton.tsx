
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface GoalsSkeletonProps {
  count?: number;
}

export const GoalsSkeleton: React.FC<GoalsSkeletonProps> = ({ count = 2 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="bg-gray-50 p-4">
            <div className="mb-2">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-1.5 w-full mt-2" />
          </CardHeader>
          
          <CardContent className="p-5">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg mt-2">
                <div className="flex items-center mb-1">
                  <Skeleton className="h-4 w-4 rounded-full mr-1.5" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="h-1 w-full mt-1.5" />
              </div>
              
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
