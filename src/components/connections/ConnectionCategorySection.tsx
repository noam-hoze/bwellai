import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, Info } from "lucide-react";
import AppLogo from "./AppLogo";

interface Integration {
  id: string;
  name: string;
  connected: boolean;
}

interface Category {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  integrations: Integration[];
}

interface ConnectionCategorySectionProps {
  category: Category;
  onConnect: ({ deviceId }) => void;
  connectedDevicesData?;
}

const ConnectionCategorySection = ({
  category,
  onConnect,
  connectedDevicesData,
}: ConnectionCategorySectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <category.icon className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold">{category.title}</h3>
      </div>

      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center mb-4">
            <Info className="h-4 w-4 text-blue-500 mr-2" />
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {category.integrations.map((integration) => (
              <Card key={integration.id} className="bg-white">
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className="bg-blue-50 p-1.5 rounded-full mr-2 flex items-center justify-center"
                      style={{ width: 32, height: 32 }}
                    >
                      <AppLogo app={integration.id} size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{integration.name}</h4>
                      <p className="text-xs text-gray-500">
                        {connectedDevicesData
                          ?.map((d) => d?.device)
                          ?.includes(integration.id)
                          ? "Active connection"
                          : "Not connected"}
                      </p>
                    </div>
                  </div>
                  {connectedDevicesData
                    ?.map((d) => d?.device)
                    ?.includes(integration.id) ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                      Connected
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onConnect({ deviceId: integration.id })}
                    >
                      Connect
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button
              variant="outline"
              // onClick={() => onConnect({ deviceId: category.id })}
            >
              View all {category.title} integrations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectionCategorySection;
