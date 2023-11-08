import { Suspense, useState } from "react";
import { Resource } from "./shared.types";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { delay } from "./lib/utils";
import { atom, useAtom } from "jotai";
import UrlResourceCreateButton from "./UrlResourceCreateButton";
import ImageResourceCreateButton from "./ImageResourceCreateButton";

function App() {
  return (
    <div className="min-h-screen flex">
      <aside className="max-w-sm w-full flex flex-col border-r">
        <div className="h-14 border-b p-2 flex gap-2 justify-between">
          <UrlResourceCreateButton />
          <ImageResourceCreateButton />
        </div>

        <div className="p-2 flex-1">
          <Suspense fallback={<div>Loading...</div>}>
            <ResourceList />
          </Suspense>
        </div>
      </aside>
      <ResourceViewer />
    </div>
  );
}

function ResourceViewer() {
  const [selectedResourceUrl, setSelectedResourceUrl] = useAtom(
    selectedResourceUrlAtom
  );

  return (
    <div className="flex flex-col flex-1">
      {selectedResourceUrl !== null && (
        <>
          <div className="h-14 border-b p-2 flex justify-between items-center gap-2">
            <p>{selectedResourceUrl}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedResourceUrl(null);
              }}
            >
              cancel
            </button>
          </div>

          <div className="p-2 flex-1">
            <iframe src={selectedResourceUrl} className="w-full h-full" />
          </div>
        </>
      )}
    </div>
  );
}

async function fetchResources(): Promise<Resource[]> {
  await delay(1000);

  return fetch("/api/resources").then((res) => res.json());
}

function ResourceList() {
  const { data } = useSuspenseQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });

  return (
    <ul className="flex flex-col gap-2">
      {data.map((resource) => {
        return <ResourceListItem key={resource.id} resource={resource} />;
      })}
    </ul>
  );
}

function deleteResource(resourceId: string) {
  return fetch(`/api/resources/${resourceId}`, {
    method: "DELETE",
  });
}

function updateResource({
  resourceId,
  updatedResource,
}: {
  resourceId: string;
  updatedResource: Resource;
}) {
  return fetch(`/api/resources/${resourceId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedResource),
  });
}

const selectedResourceUrlAtom = atom<string | null>(null);

function ResourceListItem({ resource }: { resource: Resource }) {
  const queryClient = useQueryClient();
  const deleteResourceMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resources"],
      });
    },
  });
  const updateResourceMutation = useMutation({
    mutationFn: updateResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resources"],
      });
    },
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedResourceUrl, setSelectedResourceUrl] = useAtom(
    selectedResourceUrlAtom
  );

  return (
    <div
      className={`border rounded-lg p-3 flex flex-col 
      ${selectedResourceUrl === resource.url && "border-blue-500"}`}
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
            updateResourceMutation.mutate({
              resourceId: resource.id,
              updatedResource: {
                ...resource,
                name,
              },
            });
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
        <p
          className="line-clamp-2"
          onClick={() => {
            setSelectedResourceUrl(resource.url);
          }}
        >
          {resource.name}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setIsEditMode(true);
          }}
          disabled={updateResourceMutation.isPending}
        >
          edit{updateResourceMutation.isPending && "..."}
        </button>
        <button
          type="button"
          disabled={deleteResourceMutation.isPending}
          onClick={() => {
            deleteResourceMutation.mutate(resource.id, {
              onSuccess: () => {
                alert(`${resource.name}가 삭제됐어요.`);
                setSelectedResourceUrl(null);
              },
            });
          }}
        >
          delete{deleteResourceMutation.isPending && "..."}
        </button>
      </div>
    </div>
  );
}

export default App;
