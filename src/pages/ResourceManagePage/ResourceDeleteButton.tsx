import { useSetAtom } from "jotai";
import { selectedResourceUrlAtom } from "./atoms";
import { useDeleteResourceMutation } from "./mutations";

export function ResourceDeleteButton({ resourceId }: { resourceId: string }) {
  const deleteResourceMutation = useDeleteResourceMutation();
  const setSelectedResourceUrl = useSetAtom(selectedResourceUrlAtom);

  return (
    <button
      type="button"
      disabled={deleteResourceMutation.isPending}
      onClick={() => {
        deleteResourceMutation.mutate(resourceId, {
          onSuccess: () => {
            setSelectedResourceUrl(null);
          },
        });
      }}
    >
      delete{deleteResourceMutation.isPending && "..."}
    </button>
  );
}
