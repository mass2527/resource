import { useAtom } from "jotai";
import { selectedResourceUrlAtom } from "./atoms";
import Iframe from "../../components/Iframe";
import IconButton from "../../components/IconButton";

export function ResourceViewer() {
  const [selectedResourceUrl, setSelectedResourceUrl] = useAtom(
    selectedResourceUrlAtom
  );

  return (
    <div className="flex flex-col flex-1">
      {selectedResourceUrl !== null && (
        <>
          <div className="h-14 border-b p-2 flex justify-between items-center gap-2">
            <p>{selectedResourceUrl}</p>
            <IconButton
              type="button"
              onClick={() => {
                setSelectedResourceUrl(null);
              }}
              aria-label="리소스 뷰어 닫기"
              icon="close_19"
            />
          </div>

          <div className="p-2 flex-1">
            <Iframe key={selectedResourceUrl} src={selectedResourceUrl} />
          </div>
        </>
      )}
    </div>
  );
}
