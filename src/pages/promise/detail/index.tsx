import { Suspense } from "react";
import PromiseDetailLayout from "./layout";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/shared/components/ui/button";

export default function PromiseDetailPage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="flex flex-col items-center justify-center gap-4 mt-10">
              <p>❌ 약속 정보를 불러오는 중 문제가 발생했습니다.</p>
              <Button onClick={resetErrorBoundary}>🔄 다시 시도하기</Button>
            </div>
          )}
        >
          <Suspense fallback={<div className="text-center mt-10">⏳ 불러오는 중...</div>}>
            <PromiseDetailLayout />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
