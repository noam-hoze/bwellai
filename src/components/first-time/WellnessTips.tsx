
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const tips = [
  {
    title: "Start Your Day Right",
    description: "Begin with a glass of water and 5 minutes of deep breathing",
    category: "Morning Routine",
  },
  {
    title: "Move More",
    description: "Take short walks during breaks to boost your energy",
    category: "Activity",
  },
  {
    title: "Mindful Eating",
    description: "Chew slowly and savor each bite for better digestion",
    category: "Nutrition",
  },
  {
    title: "Sleep Better",
    description: "Create a relaxing bedtime routine for quality rest",
    category: "Rest",
  },
  {
    title: "Stay Hydrated",
    description: "Aim to drink water throughout the day",
    category: "Hydration",
  },
];

const WellnessTips = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Wellness Tips</CardTitle>
        <CardDescription>
          While you build your health profile, here are some tips to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {tips.map((tip, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-purple-500">
                        {tip.category}
                      </span>
                      <h4 className="text-lg font-semibold">{tip.title}</h4>
                      <p className="text-sm text-gray-500">{tip.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default WellnessTips;
