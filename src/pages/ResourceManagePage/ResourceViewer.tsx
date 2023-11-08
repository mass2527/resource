import { useAtom } from "jotai";
import { selectedResourceUrlAtom } from "./atoms";

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
            <button
              type="button"
              onClick={() => {
                setSelectedResourceUrl(null);
              }}
            >
              cancel
            </button>
          </div>

          <div className="p-2 flex-1">
            <iframe src={selectedResourceUrl} className="w-full h-full" />
          </div>
        </>
      )}
    </div>
  );
}
