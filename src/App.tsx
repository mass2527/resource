import { useState } from "react";

type Resource =
  | {
      id: string;
      type: "url";
      name: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
    }
  | {
      id: string;
      type: "image";
      name: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
    };

function App() {
  const [resources, setResources] = useState<Resource[]>([
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
  ]);

  return (
    <div className="min-h-screen flex">
      <aside className="max-w-sm w-full flex flex-col border-r">
        <div className="h-14 border-b p-2 flex gap-2 justify-between">
          <button
            type="button"
            className="w-full border rounded"
            onClick={() => {
              const url = prompt(
                "“https://” 또는 “http://”로 시작하는 url을 입력해 주세요."
              );
              const isCanceled = url === null;
              if (isCanceled) {
                return;
              }

              const startsWithSchemeRegex = /^https?:\/\//;
              const isStartsWithScheme = startsWithSchemeRegex.test(url);
              if (!isStartsWithScheme) {
                alert(
                  "“https://” 또는 “http://”로 시작하는 url을 입력해 주세요."
                );
                return;
              }

              const youtubeUrlRegex =
                /^https?:\/\/(?:www\.)?youtube.com\/watch\?v=([A-Za-z0-9_-]{11})/;
              const youtubeVideoId = url.match(youtubeUrlRegex)?.[1];
              const urlToSave = youtubeVideoId
                ? `https://www.youtube.com/embed/${youtubeVideoId}`
                : url;
              const currentDate = new Date();
              setResources([
                {
                  id: crypto.randomUUID(),
                  type: "image",
                  name: urlToSave,
                  url: urlToSave,
                  createdAt: currentDate,
                  updatedAt: currentDate,
                },
                ...resources,
              ]);
            }}
          >
            URL 추가
          </button>

          <button type="button" className="w-full border rounded">
            이미지 추가
          </button>
        </div>

        <div className="flex flex-col gap-2 p-2 flex-1">
          {resources.map((resource) => {
            return <ResourceListItem key={resource.id} resource={resource} />;
          })}
        </div>
      </aside>
      <div className="flex flex-col flex-1">
        <div className="h-14 border-b p-2 flex justify-between items-center">
          <p>
            https://lallalalaallaaalalaaalalaaalaaaldkdfsalalaalalkfajlkflajflkajskdjflajsdlfkjasdfasd...
          </p>
          <button type="button">cancel</button>
        </div>
      </div>
    </div>
  );
}

function ResourceListItem({ resource }: { resource: Resource }) {
  return (
    <div className="border rounded-lg p-3 flex flex-col">
      <div className="line-clamp-2">{resource.name}</div>

      <div className="flex justify-end gap-2">edit trash</div>
    </div>
  );
}

export default App;
