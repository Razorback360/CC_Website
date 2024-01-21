import { api } from "@/utils/api";

export const useSystemUpdates = () => {
  const apiUtils = api.useUtils();
  const createSystemUpdateMutation = api.system.createSystemUpdate.useMutation({
    onSuccess: async (data) => {
      await apiUtils.system.getSystemUpdates.invalidate();
    },
  });

  return {
    ...createSystemUpdateMutation,
    createSystemUpdate: createSystemUpdateMutation.mutate,
    createSystemUpdateAsync: createSystemUpdateMutation.mutateAsync,
  };
};
