import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AppLogo from "./AppLogo";

interface Connection {
  id: string;
  name: string;
  category: string;
  icon: string;
  priority: string;
  benefits: string[];
  description: string;
}

interface RecommendedConnectionCardProps {
  connection: Connection;
  onConnect: ({ deviceId }) => void;
  connectedDevicesData?;
}

const RecommendedConnectionCard = ({
  connection,
  onConnect,
  connectedDevicesData,
}: RecommendedConnectionCardProps) => {
  return (
    <Card
      className={`border-l-4 ${
        connection.priority === "high"
          ? "border-l-blue-500"
          : "border-l-gray-300"
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div
              className="bg-blue-100 p-2 rounded-full mr-3 flex items-center justify-center"
              style={{ width: 40, height: 40 }}
            >
              {/* <AppLogo
                app={connection.id}
                size={24}
                fallbackIcon={connection.icon}
              /> */}
              <img
                src={connection.icon}
                alt={connection.name}
                crossOrigin="anonymous"
              />
            </div>
            <div>
              <CardTitle className="text-base">{connection.name}</CardTitle>
              <CardDescription>{connection.category}</CardDescription>
            </div>
          </div>
          {connection.priority === "high" && (
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
              Recommended
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 mb-3">{connection.description}</p>

        <div className="space-y-1">
          {connection.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start text-sm">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
              </div>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          onClick={() => onConnect({ deviceId: connection.id })}
          className="w-full"
          disabled={connectedDevicesData
            ?.map((d) => d?.device)
            ?.includes(connection.id)}
        >
          {connectedDevicesData?.map((d) => d?.device)?.includes(connection.id)
            ? `Connected`
            : `Connect ${connection.name}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendedConnectionCard;
