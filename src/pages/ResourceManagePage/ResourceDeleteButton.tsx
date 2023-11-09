import { useSetAtom } from "jotai";
import { selectedResourceUrlAtom } from "./atoms";
import { useDeleteResourceMutation } from "./mutations";
import IconButton from "../../components/IconButton";

export function ResourceDeleteButton({ resourceId }: { resourceId: string }) {
  const deleteResourceMutation = useDeleteResourceMutation();
  const setSelectedResourceUrl = useSetAtom(selectedResourceUrlAtom);

  return (
    <IconButton
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
      aria-label="리소스 삭제"
      icon="trash_19"
    />
  );
}
