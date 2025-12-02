import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { goalsService } from '../../../../app/services/goalsService';
import { formatCurrency } from '../../../../app/utils/formatCurrency';
import { Spinner } from '../../../components/Spinner';

export function GoalWidget() {
  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: () => goalsService.getAll(),
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 h-full flex items-center justify-center">
        <Spinner className="w-6 h-6" />
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 h-full flex flex-col items-center justify-center gap-4">
        <span className="text-gray-600 text-sm">Nenhuma meta em andamento.</span>
        <Link to="/goals" className="text-teal-900 font-medium text-sm hover:underline">
          Criar nova meta
        </Link>
      </div>
    );
  }

  // Find the goal with the closest deadline or just the first one
  const nearestGoal = goals.sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  })[0];

  const percentage = Math.min(100, Math.max(0, (nearestGoal.currentValue / nearestGoal.targetValue) * 100));

  return (
    <div className="bg-white rounded-2xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between z-10">
        <span className="text-gray-800 tracking-[-0.5px] font-medium">Meta em destaque</span>
        <Link to="/goals" className="text-teal-900 font-medium text-sm hover:underline">
          Ver todas
        </Link>
      </div>

      <div className="z-10 mt-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{nearestGoal.name}</h3>
        <span className="text-gray-600 text-sm block mt-1">
          Faltam {formatCurrency(nearestGoal.targetValue - nearestGoal.currentValue)}
        </span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2 mt-4 z-10">
        <div
          className="bg-teal-900 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="absolute -right-6 -bottom-6 bg-teal-50 w-32 h-32 rounded-full blur-2xl opacity-50 pointer-events-none" />
    </div>
  );
}
