
import React from "react";
import SelectPainAreaStep from "../wizard-steps/SelectPainAreaStep";
import DefinePainStep from "../wizard-steps/DefinePainStep";
import SelectExercisesStep from "../wizard-steps/SelectExercisesStep";
import ExerciseParametersStep from "../wizard-steps/ExerciseParametersStep";
import HotColdTherapyStep from "../wizard-steps/HotColdTherapyStep";
import PlanDurationStep from "../wizard-steps/PlanDurationStep";
import SummaryConfirmationStep from "../wizard-steps/SummaryConfirmationStep";
import { Info } from "lucide-react";

export const wizardSteps = [
  { 
    title: "Select Pain Area", 
    component: SelectPainAreaStep,
    infoText: "Choose the specific area of your body where you're experiencing pain. This helps us create a targeted treatment plan for your needs."
  },
  { 
    title: "Define Initial Pain", 
    component: DefinePainStep,
    infoText: "Help us understand your pain by rating its severity, describing its pattern, and identifying triggers and limitations."
  },
  { 
    title: "Select Exercises", 
    component: SelectExercisesStep,
    infoText: "Choose from recommended exercises specifically selected for your condition, or browse our complete exercise library by category."
  },
  { 
    title: "Exercise Parameters", 
    component: ExerciseParametersStep,
    infoText: "Configure each exercise by setting repetitions or duration, number of sets, and frequency to create your personalized routine."
  },
  { 
    title: "Hot/Cold Therapy", 
    component: HotColdTherapyStep,
    infoText: "Add complementary hot and cold therapies to your plan and set up application guidelines for optimal results."
  },
  { 
    title: "Plan Duration", 
    component: PlanDurationStep, 
    infoText: "Set how long you'd like to follow this treatment plan and configure helpful reminders to stay consistent."
  },
  { 
    title: "Review & Confirm", 
    component: SummaryConfirmationStep,
    infoText: "Review your complete treatment plan, expected outcomes, and confirm to begin your path to recovery."
  },
];
