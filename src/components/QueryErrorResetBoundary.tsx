import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import Button from "./Button";
import { ErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";

export default function QueryErrorResetBoundary({
  children,
}: {
  children: ReactNode;
}) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex flex-col items-center gap-2">
          문제가 발생했어요.
          <Button type="button" onClick={() => resetErrorBoundary()}>
            다시 시도
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
