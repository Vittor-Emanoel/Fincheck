import { useNearestGoal } from '@/app/hooks/useGoal';
import { cn } from '@/app/utils/cn';
import { formatDate } from '@/app/utils/formatDate';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../../app/utils/formatCurrency';
import { Spinner } from '../../../components/Spinner';
import { useDashboard } from './DashboardContext/useDashboard';

export function GoalWidget() {
  const { nearestGoal, isLoading } = useNearestGoal();
  const { areValuesVisible } = useDashboard()

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 h-full flex items-center justify-center">
        <Spinner className="w-6 h-6" />
      </div>
    );
  }

  if (!nearestGoal) {
    return (
      <div className="bg-white rounded-2xl p-6 h-[200px] flex flex-col items-center justify-center gap-4 text-center">
        <span className="text-gray-600 text-sm">Nenhuma meta em andamento.</span>
        <Link to="/goals" className="text-teal-900 font-medium text-sm hover:underline">
          Criar nova meta
        </Link>
      </div>
    );
  }

  const percentage = useMemo(() => {
    if (!nearestGoal.targetValue) return 0;

    return Math.min(
      100,
      Math.max(0, (nearestGoal.currentValue / nearestGoal.targetValue) * 100)
    );
  }, [nearestGoal]);

  const remaining = nearestGoal.targetValue - nearestGoal.currentValue;

  const goalExpectedDate =
    nearestGoal?.deadline &&
    formatDate(new Date(nearestGoal.deadline));


  return (
    <div className="bg-white rounded-2xl p-6 h-[220px] mt-5 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between z-10">
        <span className="text-gray-800 tracking-[-0.5px] font-medium">
          Próxima conquista
        </span>

        <Link to="/goals" className="text-teal-900 font-medium text-sm hover:underline">
          Ver todas
        </Link>
      </div>

      <div className="z-10 mt-3">
        <h3 className="text-xl font-semibold text-gray-900 truncate">
          {nearestGoal.name}
        </h3>

        <span className="text-gray-600 text-sm mt-1 block">
          Faltam <strong className={cn(!areValuesVisible && 'blur-sm')}>{formatCurrency(remaining)}</strong>
          {goalExpectedDate && ` • Previsão: ${goalExpectedDate}`}
        </span>
      </div>

      <div className="z-10 mt-4">
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-teal-900 h-2 rounded-full transition-[width] duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className={cn("text-gray-600 text-sm mt-1 leading-5", !areValuesVisible && 'blur-sm')}>
          {percentage > 0
            ? `Você já completou ${percentage.toFixed(0)}% do seu objetivo.`
            : `Você está iniciando essa meta!`}
        </p>
      </div>

      <div className="mt-2 z-10">
        <Link
          to={`/goals/${nearestGoal.id}`}
          className="text-teal-900 text-xs font-medium hover:underline"
        >
          + Adicionar valor
        </Link>
      </div>

      <div className="absolute -right-20 -bottom-20 bg-teal-50 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none" />
    </div>
  );
}
