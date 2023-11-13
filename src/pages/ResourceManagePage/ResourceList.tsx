import { useAtom } from "jotai";
import { MouseEventHandler, useState } from "react";
import { Resource } from "../../shared.types";
import { selectedResourceUrlAtom } from "./atoms";
import { useResourcesQuery } from "./queries";
import {
  useDeleteResourceMutation,
  useUpdateResourceMutation,
} from "./mutations";
import { cn } from "../../lib/utils";
import IconButton from "../../components/IconButton";
import { resourcePatchSchema } from "../../lib/validations";

export function ResourceList() {
  const resourcesQuery = useResourcesQuery();
  const updateResourceMutation = useUpdateResourceMutation();
  const deleteResourceMutation = useDeleteResourceMutation();
  const [selectedResourceUrl, setSelectedResourceUrl] = useAtom(
    selectedResourceUrlAtom
  );

  if (resourcesQuery.data.length === 0) {
    return (
      <p>
        등록된 리소스가 없어요.
        <br />위 "URL 추가" 또는 "이미지 추가" 버튼을 눌러 리소스를 추가해
        보세요.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {resourcesQuery.data.map((resource) => {
        return (
          <ResourceListItem
            key={resource.id}
            className={cn({
              "border-blue-500": selectedResourceUrl === resource.url,
            })}
            resource={resource}
            onResourceNameUpdate={(resourceName) => {
              updateResourceMutation.mutate(
                {
                  resourceId: resource.id,
                  updatedResource: {
                    ...resource,
                    name: resourceName,
                  },
                },
                {
                  onError: (error) => {
                    alert(error.message);
                  },
                }
              );
            }}
            onDeleteClick={(event) => {
              event.stopPropagation();
              deleteResourceMutation.mutate(resource.id, {
                onSuccess: () => {
                  setSelectedResourceUrl(null);
                },
                onError: (error) => {
                  alert(error.message);
                },
              });
            }}
            deleteDisabled={deleteResourceMutation.isPending}
            onResourceClick={(resource) => {
              setSelectedResourceUrl(resource.url);
            }}
            updateDisabled={updateResourceMutation.isPending}
          />
        );
      })}
    </ul>
  );
}

function ResourceListItem({
  resource,
  className,
  onResourceNameUpdate,
  onDeleteClick,
  onResourceClick,
  deleteDisabled,
  updateDisabled,
}: {
  resource: Resource;
  className?: string;
  onResourceNameUpdate: (resourceName: Resource["name"]) => void;
  onDeleteClick: MouseEventHandler<HTMLButtonElement>;
  onResourceClick: (resource: Resource) => void;
  deleteDisabled: boolean;
  updateDisabled: boolean;
}) {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div
      className={cn("border rounded-lg p-3 flex flex-col h-full", className)}
      onClick={() => {
        onResourceClick(resource);
      }}
    >
      {isEditMode ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const result = resourcePatchSchema.safeParse({
              name: formData.get("name"),
            });
            if (result.success) {
              setIsEditMode(false);
              onResourceNameUpdate(resource.name);
            }
          }}
        >
          <input
            type="text"
            name="name"
            autoFocus
            className="w-full p-2"
            defaultValue={resource.name}
            onBlur={(event) => {
              event.target.form?.requestSubmit();
            }}
          />
        </form>
      ) : (
        <p className="line-clamp-2">{resource.name}</p>
      )}

      <div className="flex justify-end gap-2">
        <IconButton
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsEditMode(true);
          }}
          disabled={updateDisabled}
          aria-label="리소스 수정"
          icon="edit_19"
        />
        <IconButton
          type="button"
          disabled={deleteDisabled}
          onClick={onDeleteClick}
          aria-label="리소스 삭제"
          icon="trash_19"
        />
      </div>
    </div>
  );
}
