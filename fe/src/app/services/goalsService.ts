import { httpClient } from './httpClient';

export interface Goal {
  id: string;
  name: string;
  targetValue: number;
  currentValue: number;
  deadline?: string;
  bankAccountId?: string;
  bankAccount?: {
    id: string;
    name: string;
    color: string;
    type: string;
  };
}

export interface CreateGoalParams {
  name: string;
  targetValue: number;
  currentValue: number;
  deadline?: string;
  bankAccountId?: string;
}

export interface UpdateGoalParams {
  id: string;
  name: string;
  targetValue: number;
  currentValue: number;
  deadline?: string;
  bankAccountId?: string;
}

async function getAll() {
  const { data } = await httpClient.get<Goal[]>('/goals');
  return data;
}

async function create(params: CreateGoalParams) {
  const { data } = await httpClient.post<Goal>('/goals', params);
  return data;
}

async function update(params: UpdateGoalParams) {
  const { data } = await httpClient.patch<Goal>(`/goals/${params.id}`, params);
  return data;
}

async function remove(id: string) {
  const { data } = await httpClient.delete(`/goals/${id}`);
  return data;
}

export const goalsService = {
  getAll,
  create,
  update,
  remove,
};
