import { Button } from "@/shared/components/ui/button";
import { PromiseLayout } from "@/entities/promise/ui/layout";
import { AlertTriangle } from "lucide-react";

interface PromiseErrorFallbackProps {
  resetErrorBoundary: () => void;
}

export default function PromiseErrorFallback({ resetErrorBoundary }: PromiseErrorFallbackProps) {
  return (
    <PromiseLayout title="">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <AlertTriangle className="w-16 h-16 text-primary" />
        <h1 className="text-2xl font-bold text-primary">500</h1>
        <p className="text-base text-muted-foreground">약속 정보를 불러오는 중 문제가 발생했습니다.</p>
      </div>

      <div className="fixed left-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-lg pb-safe-bottom border-primary bg-primary text-primary-foreground py-1">
          <Button className="w-full text-primary-foreground border-none" variant="link" onClick={resetErrorBoundary}>
            다시 시도하기
          </Button>
        </div>
      </div>
    </PromiseLayout>
  );
}
