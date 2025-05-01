import { Button } from "@/components/ui/button";
import { useJourneyDialog } from "@/hooks/use-journey-dialog";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const StartJourneyBanner = ({
  getUserOverallStatusIsData,
  getProfileIsData,
}) => {
  const { openJourney } = useJourneyDialog();
  const [isAnimating, setIsAnimating] = useState(false);
  const currentText =
    getProfileIsData?.onBoarding ||
    (getUserOverallStatusIsData &&
      Object.values(getUserOverallStatusIsData)?.some(
        (value) => value === true
      ));

  useEffect(() => {
    // First blink
    const firstBlink = setTimeout(() => {
      setIsAnimating(true);

      // Reset first blink
      setTimeout(() => {
        setIsAnimating(false);

        // Second blink
        setTimeout(() => {
          setIsAnimating(true);

          // Reset second blink
          setTimeout(() => {
            setIsAnimating(false);
          }, 800);
        }, 400);
      }, 800);
    }, 500);

    return () => clearTimeout(firstBlink);
  }, []);

  return (
    <div
      className={`w-full bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6 transition-all duration-500
        ${isAnimating ? "ring-2 ring-yellow-400" : ""}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentText ? "Continue" : "Start"} Your Journey with BWellAI
          </h2>
          <p className="text-gray-600">
            Let's set up your personalized wellness experience together
          </p>
        </div>
        <Button
          onClick={openJourney}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md"
          size="lg"
        >
          {currentText ? "Continue" : "Start"} Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default StartJourneyBanner;
