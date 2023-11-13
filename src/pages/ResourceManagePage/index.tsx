import { Suspense } from "react";
import UrlResourceCreateButton from "./UrlResourceCreateButton";
import { ResourceViewer } from "./ResourceViewer";
import { ResourceList } from "./ResourceList";
import ResourceListPlaceholder from "./ResourceListPlaceholder";
import QueryErrorResetBoundary from "../../components/QueryErrorResetBoundary";
import { useCreateResourceMutation } from "./mutations";
import FileInput from "../../components/FileInput";
import { VALID_IMAGE_FILE_TYPES } from "../../lib/constants";
import { useAtom } from "jotai";
import { selectedResourceUrlAtom } from "./atoms";

export default function ResourceManagePage() {
  const createResourceMutation = useCreateResourceMutation();
  const [selectedResourceUrl, setSelectedResourceUrl] = useAtom(
    selectedResourceUrlAtom
  );

  return (
    <div className="min-h-screen flex">
      <aside className="max-w-sm w-full border-r">
        <div className="h-14 border-b p-2 flex gap-2 justify-between">
          <UrlResourceCreateButton />
          <FileInput
            validFileTypes={VALID_IMAGE_FILE_TYPES}
            multiple
            label="이미지 추가"
            disabled={createResourceMutation.isPending}
            onUpload={(file) => {
              const imageUrl = URL.createObjectURL(file);
              createResourceMutation.mutate(
                {
                  type: "image",
                  name: file.name,
                  url: imageUrl,
                },
                {
                  onError: (error) => {
                    alert(error.message);
                  },
                }
              );
            }}
          />
        </div>

        <div className="p-2 h-[calc(100vh-56px)] overflow-y-auto">
          <QueryErrorResetBoundary>
            <Suspense fallback={<ResourceListPlaceholder />}>
              <ResourceList />
            </Suspense>
          </QueryErrorResetBoundary>
        </div>
      </aside>
      {selectedResourceUrl !== null && (
        <ResourceViewer
          resourceUrl={selectedResourceUrl}
          onCloseClick={() => {
            setSelectedResourceUrl(null);
          }}
        />
      )}
    </div>
  );
}
