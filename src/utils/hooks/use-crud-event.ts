import { toast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { useSelectedEvent } from "@/utils/hooks/use-selected-event";
import { useSystemUpdates } from "@/utils/hooks/use-system-updates";

export const useDeleteEvent = (
  setIsCreatingNewEvent: (value: boolean) => void,
) => {
  const { selectEvent } = useSelectedEvent();
  const apiUtils = api.useUtils();
  const { createSystemUpdateAsync } = useSystemUpdates();

  const deleteEventMutation = api.event.delete.useMutation({
    onSettled: async (data, error, variables, context) => {
      if (error) {
        toast({
          title: "Failed to delete event!",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      if (data) {
        await createSystemUpdateAsync({
          referenceId: data.id,
          description: `Deleted event: ${data.title}`,
          type: "EVENT_DELETE",
        });
        selectEvent(undefined);
        setIsCreatingNewEvent(true);
        await apiUtils.event.getAll.invalidate();
        toast({
          title: "Event Deleted!",
          description: "Your event has been deleted successfully.",
        });
      }
    },
  });

  return {
    ...deleteEventMutation,
    deleteEventAsync: deleteEventMutation.mutateAsync,
    loading: deleteEventMutation.isLoading,
  };
};
