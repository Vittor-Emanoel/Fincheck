import { Goal } from "../../../../app/services/goalsService";
import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { formatDate } from "../../../../app/utils/formatDate";

interface GoalCardProps {
  data: Goal;
}

export function GoalCard({ data }: GoalCardProps) {
  const progress = Math.min((data.currentValue / data.targetValue) * 100, 100);

  return (
    <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900 tracking-[-0.5px]">{data.name}</span>
        {data.deadline && (
          <span className="text-xs text-gray-600">
            Até {formatDate(new Date(data.deadline))}
          </span>
        )}
      </div>

      <div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{formatCurrency(data.currentValue)}</span>
          <span>{formatCurrency(data.targetValue)}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-teal-900 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
