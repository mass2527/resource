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

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const VALID_IMAGE_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random#%EC%B5%9C%EB%8C%93%EA%B0%92%EC%9D%84_%ED%8F%AC%ED%95%A8%ED%95%98%EB%8A%94_%EC%A0%95%EC%88%98_%EB%82%9C%EC%88%98_%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

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

  async function addResource({
    type,
    name,
    url,
  }: Pick<Resource, "type" | "name" | "url">) {
    const randomInt = getRandomIntInclusive(300, 1000);
    await delay(randomInt);

    const isSuccess = Math.random() < 0.8;
    if (isSuccess) {
      const currentDate = new Date();
      setResources((prevResources) => [
        {
          id: crypto.randomUUID(),
          type,
          name,
          url,
          createdAt: currentDate,
          updatedAt: currentDate,
        },
        ...prevResources,
      ]);
      alert(`${type === "image" ? "이미지" : "URL"} 등록에 성공했어요.`);
    } else {
      alert(`${type === "image" ? "이미지" : "URL"} 등록에 실패했어요.`);
    }
  }

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
              addResource({
                type: "url",
                name: urlToSave,
                url: urlToSave,
              });
            }}
          >
            URL 추가
          </button>

          <label className="w-full border rounded flex justify-center items-center">
            이미지 추가
            <input
              type="file"
              accept={VALID_IMAGE_FILE_TYPES.join(",")}
              multiple
              className="opacity-0 w-0 h-0"
              onChange={(event) => {
                const fileList = event.target.files;
                if (fileList === null || fileList.length === 0) {
                  return;
                }

                for (const file of fileList) {
                  const isValidImageFileType = VALID_IMAGE_FILE_TYPES.includes(
                    file.type
                  );
                  if (isValidImageFileType) {
                    const imageUrl = URL.createObjectURL(file);
                    addResource({
                      type: "image",
                      name: file.name,
                      url: imageUrl,
                    });
                  } else {
                    alert(`파일명: ${file.name}
                    .png, .jpg 형식의 이미지 파일을 업로드해 주세요.
                    `);
                  }
                }
              }}
            />
          </label>
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
