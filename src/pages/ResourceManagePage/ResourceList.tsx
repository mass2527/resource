import { useAtom } from "jotai";
import { useState } from "react";
import { Resource } from "../../shared.types";
import { selectedResourceUrlAtom } from "./atoms";
import { useResourcesQuery } from "./queries";
import { useUpdateResourceMutation } from "./mutations";
import { cn } from "../../lib/utils";
import { ResourceDeleteButton } from "./ResourceDeleteButton";

export function ResourceList() {
  const resourcesQuery = useResourcesQuery();

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
        return <ResourceListItem key={resource.id} resource={resource} />;
      })}
    </ul>
  );
}

function ResourceListItem({ resource }: { resource: Resource }) {
  const updateResourceMutation = useUpdateResourceMutation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedResourceUrl, setSelectedResourceUrl] = useAtom(
    selectedResourceUrlAtom
  );

  return (
    <div
      className={cn("border rounded-lg p-3 flex flex-col h-full", {
        "border-blue-500": selectedResourceUrl === resource.url,
      })}
      onClick={() => {
        setSelectedResourceUrl(resource.url);
      }}
    >
      {isEditMode ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const formElement = event.currentTarget;
            const formData = new FormData(formElement);
            const name = formData.get("name");
            if (!name) {
              return;
            }

            setIsEditMode(false);
            updateResourceMutation.mutate(
              {
                resourceId: resource.id,
                updatedResource: {
                  ...resource,
                  name,
                },
              },
              {
                onError: (error) => {
                  alert(error.message);
                },
              }
            );
          }}
        >
          <input
            type="text"
            name="name"
            autoFocus
            className="w-full p-2"
            defaultValue={resource.name}
            disabled={updateResourceMutation.isPending}
            onBlur={(event) => {
              setIsEditMode(false);
              updateResourceMutation.mutate({
                resourceId: resource.id,
                updatedResource: {
                  ...resource,
                  name: event.target.value,
                },
              });
            }}
          />
        </form>
      ) : (
        <p className="line-clamp-2">{resource.name}</p>
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsEditMode(true);
          }}
          disabled={updateResourceMutation.isPending}
        >
          edit{updateResourceMutation.isPending && "..."}
        </button>
        <ResourceDeleteButton resourceId={resource.id} />
      </div>
    </div>
  );
}
