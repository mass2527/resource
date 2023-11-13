import Button from "./Button";

export default function UrlAddButton({
  disabled,
  onUrlAdd,
}: {
  disabled: boolean;
  onUrlAdd: (url: string) => void;
}) {
  return (
    <Button
      type="button"
      disabled={disabled}
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
        onUrlAdd(urlToSave);
      }}
    >
      URL 추가
    </Button>
  );
}
