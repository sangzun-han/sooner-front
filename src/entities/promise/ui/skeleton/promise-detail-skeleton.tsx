import { PromiseLayout } from "../layout";
import { Button } from "@/shared/components/ui/button";

export default function PromiseDetailSkeleton() {
  return (
    <PromiseLayout title="">
      <div className="flex flex-col w-full max-w-lg gap-10 pb-32">
        {/* ──────────────── 상단 텍스트 ──────────────── */}
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-xl font-bold leading-snug text-primary">되는 날을 확인하세요</h1>
          <p className="mt-2 text-sm text-muted-foreground">투표된 날짜가 달력에 표시돼요</p>
          <p className="mt-2 text-sm bg-primary/80 text-primary-foreground inline-block px-2 py-1 rounded-md w-2/5 h-6"></p>
        </div>

        <div className="w-full border-t border-gray-200 mt-4 animate-pulse">
          <div className="mb-2 flex w-full items-center justify-between">
            <div className="w-8 h-8 bg-gray-200 rounded-md" />
            <div className="w-32 h-6 bg-gray-200 rounded-md" />
            <div className="w-8 h-8 bg-gray-200 rounded-md" />
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
              <div key={idx} className={`w-full h-6 bg-gray-200 rounded-md ${day === "일" ? "bg-red-200" : ""}`} />
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 42 }).map((_, idx) => (
              <div key={idx} className="w-full h-10 bg-gray-200 rounded-md" />
            ))}
          </div>
        </div>

        <div className="fixed left-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center">
          <div className="flex w-full max-w-lg pb-safe-bottom border-primary bg-primary text-primary-foreground py-1">
            <Button className="w-1/2 text-muted border-none" variant="link" disabled>
              다시 시도하기
            </Button>
            <Button className="w-1/2 text-primary-foreground" disabled>
              공유하기
            </Button>
          </div>
        </div>
      </div>
    </PromiseLayout>
  );
}
