
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import DateNavigation from "@/components/sleep/DateNavigation";
import SleepHeader from "@/components/sleep/SleepHeader";
import DailyTabContent from "@/components/sleep/DailyTabContent";
import WeeklyTabContent from "@/components/sleep/WeeklyTabContent";
import MonthlyTabContent from "@/components/sleep/MonthlyTabContent";
import { getDateDisplay, goToPreviousDate, goToNextDate, isToday } from "@/components/sleep/SleepDateUtils";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type ViewType = "day" | "week" | "month";

const Sleep = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<ViewType>("day");

  const handlePrevious = () => {
    setSelectedDate(prev => goToPreviousDate(prev, viewType));
  };

  const handleNext = () => {
    setSelectedDate(prev => goToNextDate(prev, viewType));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const isTodaySelected = isToday(selectedDate) && viewType === "day";
  const dateDisplay = getDateDisplay(selectedDate, viewType);

  return (
    <Layout>
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <SleepHeader />
          
          <div className="space-y-4">
            <DateNavigation 
              dateDisplay={dateDisplay}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onToday={handleToday}
              isToday={isTodaySelected}
            />
            
            <Tabs 
              value={viewType} 
              onValueChange={(value) => setViewType(value as ViewType)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full bg-gray-50 p-1 rounded-lg">
                <TabsTrigger 
                  value="day" 
                  className="text-base py-3 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
                >
                  Day
                </TabsTrigger>
                <TabsTrigger 
                  value="week" 
                  className="text-base py-3 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
                >
                  Week
                </TabsTrigger>
                <TabsTrigger 
                  value="month" 
                  className="text-base py-3 data-[state=active]:bg-[#fe7440] data-[state=active]:text-white"
                >
                  Month
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="day" className="mt-6">
                <DailyTabContent selectedDate={selectedDate} />
              </TabsContent>
              
              <TabsContent value="week" className="mt-6">
                <WeeklyTabContent selectedDate={selectedDate} />
              </TabsContent>
              
              <TabsContent value="month" className="mt-6">
                <MonthlyTabContent selectedDate={selectedDate} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sleep;
