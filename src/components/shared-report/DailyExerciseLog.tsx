
import React from 'react';
import { Calendar, ChevronUp, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react';

interface Exercise {
  name: string;
  completed: boolean;
  painDuring: number | null;
  difficulty: number | null;
}

interface ExerciseLogEntry {
  day: number;
  date: Date;
  overallPainStart: number;
  overallPainEnd: number;
  exercises: Exercise[];
}

interface DailyExerciseLogProps {
  exerciseLog: ExerciseLogEntry[];
  expandedSections: { dailyLog: boolean };
  toggleSection: (section: string) => void;
  formatShortDate: (date: Date) => string;
}

const DailyExerciseLog: React.FC<DailyExerciseLogProps> = ({
  exerciseLog,
  expandedSections,
  toggleSection,
  formatShortDate
}) => {
  return (
    <div className="p-4 md:p-6 border-b">
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer touch-manipulation"
        onClick={() => toggleSection('dailyLog')}
      >
        <h2 className="text-lg font-semibold flex items-center">
          <Calendar size={20} className="mr-2 text-gray-600" />
          Daily Exercise Log
        </h2>
        {expandedSections.dailyLog ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {expandedSections.dailyLog && (
        <div className="space-y-4">
          {exerciseLog.map((day) => (
            <div key={day.day} className="border rounded-lg p-4">
              <div className="flex flex-col md:flex-row justify-between items-start mb-3 space-y-2 md:space-y-0">
                <div>
                  <h3 className="font-medium">Day {day.day} - {formatShortDate(day.date)}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    Overall Pain: {day.overallPainStart}/10 → {day.overallPainEnd}/10
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-sm text-gray-600">Completion</div>
                  <div className="text-lg font-bold text-green-700">
                    {Math.round((day.exercises.filter(e => e.completed).length / day.exercises.length) * 100)}%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {day.exercises.map((exercise, idx) => (
                  <div key={idx} className={`flex items-center text-sm ${
                    exercise.completed ? '' : 'opacity-50'
                  }`}>
                    <div className={`w-5 h-5 rounded mr-2 flex items-center justify-center flex-shrink-0 ${
                      exercise.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {exercise.completed ? (
                        <CheckCircle size={14} className="text-green-600" />
                      ) : (
                        <AlertCircle size={14} className="text-gray-400" />
                      )}
                    </div>
                    <span className={exercise.completed ? '' : 'line-through'}>
                      {exercise.name}
                    </span>
                    {exercise.completed && exercise.painDuring !== null && (
                      <span className="ml-2 text-xs text-gray-500">
                        (Pain: {exercise.painDuring}/10)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyExerciseLog;
