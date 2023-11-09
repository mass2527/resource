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
      onClick={(event) => {
        event.stopPropagation();
        deleteResourceMutation.mutate(resourceId, {
          onSuccess: () => {
            setSelectedResourceUrl(null);
          },
          onError: (error) => {
            alert(error.message);
          },
        });
      }}
    >
      delete{deleteResourceMutation.isPending && "..."}
    </button>
  );
}
