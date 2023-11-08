export const resourceKeys = {
  all: [{ scope: "resources" }] as const,
  lists: () => [{ ...resourceKeys.all[0], entity: "list" }] as const,
};
