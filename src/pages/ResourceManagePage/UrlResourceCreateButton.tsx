import Button from "../../components/Button";
import { useCreateResourceMutation } from "./mutations";

export default function UrlResourceCreateButton() {
  const createResourceMutation = useCreateResourceMutation();

  return (
    <Button
      type="button"
      disabled={createResourceMutation.isPending}
      loading={createResourceMutation.isPending}
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
          alert("“https://” 또는 “http://”로 시작하는 url을 입력해 주세요.");
          return;
        }

        const youtubeUrlRegex =
          /^https?:\/\/(?:www\.)?youtube.com\/watch\?v=([A-Za-z0-9_-]{11})/;
        const youtubeVideoId = url.match(youtubeUrlRegex)?.[1];
        const urlToSave = youtubeVideoId
          ? `https://www.youtube.com/embed/${youtubeVideoId}`
          : url;
        createResourceMutation.mutate(
          {
            type: "url",
            name: urlToSave,
            url: urlToSave,
          },
          {
            onError: (error) => {
              alert(error.message);
            },
          }
        );
      }}
    >
      URL 추가
    </Button>
  );
}
