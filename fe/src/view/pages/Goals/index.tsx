import { PlusIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Logo } from '../../components/Logo';
import { Spinner } from '../../components/Spinner';
import { UserMenu } from '../../components/UserMenu';
import { GoalCard } from './components/GoalCard';
import { NewGoalModal } from './modals/NewGoalModal';
import { useGoalsController } from './useGoalsController';

export function Goals() {
  const {
    goals,
    isLoading,
    isNewGoalModalOpen,
    openNewGoalModal,
    closeNewGoalModal,
  } = useGoalsController();

  return (
    <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
      <header className="h-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="h-6 text-teal-900" />
          <Link to="/" className="text-teal-900 font-medium hover:underline">Dashboard</Link>
        </div>
        <UserMenu />
      </header>

      <main className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Minhas Metas</h1>
          <Button onClick={openNewGoalModal} className="w-32">
            <PlusIcon className="w-4 h-4 mr-2" />
            Nova Meta
          </Button>
        </div>

        {isLoading && (
          <div className="h-full flex items-center justify-center">
            <Spinner className="w-10 h-10" />
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.length > 0 && goals.map(goal => (
              <GoalCard key={goal.id} data={goal} />
            ))}

            {goals.length === 0 && (
               <div className="col-span-full flex items-center justify-center h-32">
                 <p className="text-gray-600">Nenhuma meta encontrada.</p>
               </div>
            )}
          </div>
        )}
      </main>

      <NewGoalModal
        open={isNewGoalModalOpen}
        onClose={closeNewGoalModal}
      />
    </div>
  );
}
