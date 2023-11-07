export type Resource = {
  id: string;
  type: "url" | "image";
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};
