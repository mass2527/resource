import { Suspense } from "react";
import ImageResourceCreateButton from "./ImageResourceCreateButton";
import UrlResourceCreateButton from "./UrlResourceCreateButton";
import { ResourceViewer } from "./ResourceViewer";
import { ResourceList } from "./ResourceList";
import ResourceListPlaceholder from "./ResourceListPlaceholder";
import QueryErrorResetBoundary from "../../components/QueryErrorResetBoundary";

export default function ResourceManagePage() {
  return (
    <div className="min-h-screen flex">
      <aside className="max-w-sm w-full flex flex-col border-r">
        <div className="h-14 border-b p-2 flex gap-2 justify-between">
          <UrlResourceCreateButton />
          <ImageResourceCreateButton />
        </div>

        <div className="p-2 flex-1 h-[calc(100vh - 14rem)] overflow-y-auto">
          <QueryErrorResetBoundary>
            <Suspense fallback={<ResourceListPlaceholder />}>
              <ResourceList />
            </Suspense>
          </QueryErrorResetBoundary>
        </div>
      </aside>
      <ResourceViewer />
    </div>
  );
}
