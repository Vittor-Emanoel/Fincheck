import { useQuery } from "@tanstack/react-query";
import { goalsService } from "../services/goalsService";

export const useNearestGoal = () => {
  const { data: goal, isLoading } = useQuery({
    queryKey: ['goal', 'nearest'],
    queryFn: () => goalsService.getAll(),
    select: (goals) => {
      return [...goals].sort((a, b) => {
        const aTime = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const bTime = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        return aTime - bTime;
      })[0]
    }
  });

  return {
    nearestGoal: goal,
    isLoading,
  }
}