import { authHttpClient } from '@/internals/network/auth-client';
import { defineRepository } from '@/internals/repository-utils';
import type { ITask, TASK_TYPES } from '@/models/task-model';

const tasksRepo = defineRepository(() => {
  return {
    async getListTasks(address: string) {
      const resp = await authHttpClient.get<ITask[]>(`/tasks/${address}`);
      return resp.payload;
    },
    async completeTask(address: string, body: { type: TASK_TYPES }) {
      const resp = await authHttpClient.post<ITask>(`/tasks/${address}`, body);
      return resp.payload;
    },
  };
});

export default tasksRepo;
