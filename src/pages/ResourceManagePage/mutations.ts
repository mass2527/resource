import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Resource } from "../../shared.types";
import { resourceKeys } from "./queryKeys";

async function deleteResource(resourceId: string) {
  const res = await fetch(`/api/resources/${resourceId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("리소스 삭제를 실패했어요.");
  }
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

async function updateResource({
  resourceId,
  updatedResource,
}: {
  resourceId: string;
  updatedResource: Resource;
}) {
  const res = await fetch(`/api/resources/${resourceId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedResource),
  });
  if (!res.ok) {
    throw new Error("리소스 수정을 실패했어요.");
  }
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
): Promise<Resource> {
  const res = await fetch("/api/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resource),
  });
  if (!res.ok) {
    if (res.status === 409) {
      throw new Error("이미 등록된 URL이에요.");
    } else {
      throw new Error(
        `${resource.type === "image" ? "이미지" : "URL"} 등록에 실패했어요.`
      );
    }
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
