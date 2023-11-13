import Iframe from "../../components/Iframe";
import IconButton from "../../components/IconButton";

export function ResourceViewer({
  resourceUrl,
  onCloseClick,
}: {
  resourceUrl: string;
  onCloseClick: () => void;
}) {
  return (
    <div className="flex flex-col flex-1">
      <div className="h-14 border-b p-2 flex justify-between items-center gap-2">
        <p>{resourceUrl}</p>
        <IconButton
          type="button"
          onClick={() => {
            onCloseClick();
          }}
          aria-label="리소스 뷰어 닫기"
          icon="close_19"
        />
      </div>

      <div className="p-2 flex-1">
        <Iframe key={resourceUrl} src={resourceUrl} />
      </div>
    </div>
  );
}
