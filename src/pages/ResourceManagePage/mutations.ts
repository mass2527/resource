import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Resource } from "../../shared.types";
import { resourceKeys } from "./queryKeys";

function deleteResource(resourceId: string) {
  return fetch(`/api/resources/${resourceId}`, {
    method: "DELETE",
  });
}

export function useDeleteResourceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resourceKeys.lists(),
      });
    },
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

export function useUpdateResourceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resourceKeys.lists(),
      });
    },
  });
}

async function createResource(
  resource: Pick<Resource, "type" | "name" | "url">
) {
  const res = await fetch("/api/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resource),
  });
  if (!res.ok) {
    throw new Error(
      `${resource.type === "image" ? "이미지" : "URL"} 등록에 실패했어요.`
    );
  }

  return res.json();
}

export function useCreateResourceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resourceKeys.lists(),
      });
    },
  });
}
