import { useSuspenseQuery } from "@tanstack/react-query";
import { delay } from "../../lib/utils";
import { Resource } from "../../shared.types";
import { resourceKeys } from "./queryKeys";

async function fetchResources(): Promise<Resource[]> {
  await delay(1000);

  const res = await fetch("/api/resources");
  if (!res.ok) {
    throw Error;
  }

  return res.json();
}

export function useResourcesQuery() {
  return useSuspenseQuery({
    queryKey: resourceKeys.lists(),
    queryFn: fetchResources,
  });
}
