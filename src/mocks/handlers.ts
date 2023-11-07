import { http, HttpResponse } from "msw";
import { Resource } from "../shared.types";

let resources: Resource[] = [
  {
    id: "1",
    type: "url",
    name: "https://www.robinwieruch.de/react-libraries/",
    url: "https://www.robinwieruch.de/react-libraries/",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    type: "url",
    name: "https://typed.do/blog-kr/how-to-make-good-usability-product/",
    url: "https://typed.do/blog-kr/how-to-make-good-usability-product/",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const handlers = [
  http.get("/api/resources", () => {
    return HttpResponse.json(resources, { status: 200 });
  }),
  http.delete("/api/resources/:id", ({ params }) => {
    resources = resources.filter((resource) => resource.id !== params.id);

    return new HttpResponse(null, { status: 204 });
  }),
  http.patch("/api/resources/:id", async ({ params, request }) => {
    const body = await request.json();

    resources = resources.map((resource) => {
      if (resource.id === params.id) {
        return {
          ...resource,
          name: body.name,
        };
      }

      return resource;
    });

    return HttpResponse.json(
      resources.find((resource) => resource.id === params.id),
      {
        status: 200,
      }
    );
  }),
];
