import { http, HttpResponse } from "msw";
import { Resource } from "../shared.types";
import { delay, getRandomIntInclusive } from "../lib/utils";

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
  http.post("/api/resources", async ({ request }) => {
    const body = (await request.json()) as Pick<
      Resource,
      "type" | "name" | "url"
    >;
    if (resources.some((resource) => resource.url === body.url)) {
      return new HttpResponse(null, { status: 409 });
    }

    const randomInt = getRandomIntInclusive(300, 1000);
    await delay(randomInt);
    const isSuccess = Math.random() < 0.8;
    if (!isSuccess) {
      return new HttpResponse(null, { status: 500 });
    }

    const currentDate = new Date();
    const newResource = {
      id: crypto.randomUUID(),
      createdAt: currentDate,
      updatedAt: currentDate,
      ...body,
    };
    resources.push(newResource);

    return HttpResponse.json(newResource, {
      status: 201,
    });
  }),
  http.get("/api/resources", () => {
    return HttpResponse.json(
      [...resources].sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      ),
      { status: 200 }
    );
  }),
  http.patch("/api/resources/:id", async ({ params, request }) => {
    const body = await request.json();

    resources = resources.map((resource) => {
      if (resource.id === params.id) {
        const currentDate = new Date();
        return {
          ...resource,
          name: body.name,
          updatedAt: currentDate,
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
  http.delete("/api/resources/:id", ({ params }) => {
    resources = resources.filter((resource) => resource.id !== params.id);

    return new HttpResponse(null, { status: 204 });
  }),
];
