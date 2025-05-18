import { Button } from "@/shared/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { PromiseHeader } from "@/entities/promise/ui/common";

interface PromiseInitProps {
  onNext: () => void;
}

export default function PromiseInit({ onNext }: PromiseInitProps) {
  return (
    <div className="flex flex-col w-full max-w-lg gap-10">
      <PromiseHeader
        title={
          <>
            아래 버튼을 눌러
            <br />
            새로운 약속을 잡아보세요
          </>
        }
        description="친구들에게 공유하고 함께 투표할 수 있어요."
      />
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Pencil className="h-10 w-10 text-primary" />
        </div>
        <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
          <Plus className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-0 z-20 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-lg pb-safe-bottom border-primary bg-primary text-primary-foreground py-1">
          <Button className="w-full bg-primary text-primary-foreground" onClick={onNext}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
