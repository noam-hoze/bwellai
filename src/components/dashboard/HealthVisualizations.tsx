import SleepQualityChart from "./charts/SleepQualityChart";
import VitalsChart from "./charts/VitalsChart";

const HealthVisualizations = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <SleepQualityChart />
      <VitalsChart />
    </div>
  );
};

export default HealthVisualizations;
