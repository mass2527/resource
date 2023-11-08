import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Resource } from "./shared.types";

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

export const useCreateResourceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resources"],
      });
    },
  });
};
