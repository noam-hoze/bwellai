
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import DateNavigation from "@/components/activity/DateNavigation";
import ActivityHeader from "@/components/activity/ActivityHeader";
import DailyTabContent from "@/components/activity/DailyTabContent";
import WeeklyTabContent from "@/components/activity/WeeklyTabContent";
import MonthlyTabContent from "@/components/activity/MonthlyTabContent";
import { getDateDisplay, goToPreviousDate, goToNextDate, isToday } from "@/components/activity/ActivityDateUtils";

type ViewType = "day" | "week" | "month";

const Activity = () => {
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
          <ActivityHeader viewType={viewType} onViewTypeChange={setViewType} />
          
          <DateNavigation 
            dateDisplay={dateDisplay}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onToday={handleToday}
            isToday={isTodaySelected}
          />
          
          <Tabs value={viewType}>
            <TabsContent value="day" className="mt-0">
              <DailyTabContent selectedDate={selectedDate} />
            </TabsContent>
            
            <TabsContent value="week" className="mt-0">
              <WeeklyTabContent selectedDate={selectedDate} />
            </TabsContent>
            
            <TabsContent value="month" className="mt-0">
              <MonthlyTabContent selectedDate={selectedDate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Activity;
