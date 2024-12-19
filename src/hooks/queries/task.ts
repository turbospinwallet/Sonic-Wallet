import { useMutation, useQuery } from '@tanstack/react-query';
import tasksRepo from '@/internals/repository/task-repo';
import type { TASK_TYPES } from '@/models/task-model';
import { useHandleToastError } from '@/hooks/useToastError';
export const useQueryTasks = (address: string | undefined) => {
  return useQuery({
    queryKey: ['user', address, 'friends'],
    queryFn: async () => {
      if (!address) {
        return null;
      }
      const user = await tasksRepo.getListTasks(address);
      return user;
    },
    enabled: !!address,
    retry: false,
  });
};

export const useCompleteTask = () => {
  const { showToastError } = useHandleToastError();
  return useMutation({
    mutationFn: async ({ address, data }: { address: string; data: { type: TASK_TYPES } }) => {
      return await tasksRepo.completeTask(address, data);
    },
    onSuccess: () => {},
    onError: (error) => {
      showToastError(error);
    },
  });
};
