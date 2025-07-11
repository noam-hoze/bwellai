import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GoalData } from "../CreateGoalWizard";

interface GoalTypeStepProps {
  goalData: GoalData;
  updateGoalData: (data: GoalData) => void;
  userGoalDetails?;
  userGoalExerciseDetailsData?;
}

const GoalTypeStep = ({
  goalData,
  userGoalDetails,
  updateGoalData,
}: GoalTypeStepProps) => {
  const imageObj = {
    neck: {
      image:
        "/images/goals/neck.png",
    },
    upper_back: {
      image:
        "/images/goals/upper_back.png",
    },
    lower_back: {
      image:
        "/images/goals/lower_back.png",
    },
    pelvis : {
      image:
        "/images/goals/pelvis.png",
    },
    hip: {
      image:
        "/images/goals/hip.png",
    },
    knee: {
      image:
        "/images/goals/knee.png",
    },
    ankle_foot: {
      image:
        "/images/goals/ankle_foot.png",
    },
    shoulder: {
      image:
        "/images/goals/shoulder.png",
    }
  };
  const goalTypes = [
    {
      id: "back_pain",
      title: "Back Pain",
      description:
        "Targeted exercises to strengthen core and relieve back pain",
      image:
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: "neck_pain",
      title: "Neck Pain",
      description: "Exercises to improve neck mobility and reduce stiffness",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: "shoulder_pain",
      title: "Shoulder Pain",
      description:
        "Movements to increase shoulder range of motion and strength",
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
  ];

  const selectGoalType = ({
    type,
    name,
    id,
  }: {
    type: string;
    name: string;
    id: number;
  }) => {
    updateGoalData({
      ...goalData,
      type,
      goalId: id,
      name: `${name} Management Goal`,
    });
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">
        Select the type of pain you want to manage:
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {userGoalDetails?.map((type) => (
          <Card
            key={type.id}
            className={cn(
              "cursor-pointer overflow-hidden transition-all hover:shadow-md",
              goalData.type === type?.goalType
                ? "ring-2 ring-wellness-bright-green"
                : ""
            )}
            onClick={() =>
              selectGoalType({
                type: type?.goalType,
                name: type?.name,
                id: type?.id,
              })
            }
          >
            <div
              className="h-40 bg-cover bg-center w-full"
              style={{
                backgroundImage: `url(${imageObj?.[type?.goalType]?.image})`,
              }}
            ></div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">{type?.name}</h3>
              <p className="text-sm text-gray-600">{type?.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalTypeStep;
