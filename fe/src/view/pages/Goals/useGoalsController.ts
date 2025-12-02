import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { goalsService } from "../../../app/services/goalsService";

export function useGoalsController() {
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);

  const { data: goals, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: goalsService.getAll,
  });

  function openNewGoalModal() {
    setIsNewGoalModalOpen(true);
  }

  function closeNewGoalModal() {
    setIsNewGoalModalOpen(false);
  }

  return {
    goals: goals || [],
    isLoading,
    isNewGoalModalOpen,
    openNewGoalModal,
    closeNewGoalModal,
  };
}
