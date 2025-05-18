import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { PromiseLayout } from "@/entities/promise/ui/layout";
import { PromiseErrorFallback } from "@/entities/promise/ui/fallback";
import { PromiseDetailSkeleton } from "@/entities/promise/ui/skeleton";
import PromiseDetailContent from "./content";

export default function PromiseDetailPage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => <PromiseErrorFallback resetErrorBoundary={resetErrorBoundary} />}
        >
          <Suspense fallback={<PromiseDetailSkeleton />}>
            <PromiseLayout>
              <PromiseDetailContent />
            </PromiseLayout>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
