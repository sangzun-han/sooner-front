import { Button } from "@/shared/components/ui/button";
import { Pencil, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function PromisePage() {
  const navigate = useNavigate();

  return (
    <div id="main-container" className="flex min-h-screen w-full flex-col items-center justify-start">
      <header id="main-header" className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="relative z-20 flex w-full max-w-lg flex-row items-center justify-between gap-4 transition-colors bg-white h-[52px] max-h-[52px] min-h-[52px] px-24">
          <div className="absolute bottom-0 left-3 top-0 flex flex-row items-center justify-center">
            <Link target="_self" to="/" className="flex flex-1 items-center justify-center p-2">
              <span className="sr-only">Home</span>
              <img src="/logo.svg" width={64} height={64} alt="sonner-icon" className="object-cover" />
            </Link>
          </div>
          <div className="flex-1 truncate text-center text-sm transition-colors text-muted-foreground font-bold">
            약속잡기
          </div>
          <div className="absolute bottom-0 right-3 top-0 flex flex-row items-center justify-center">
            <Button type="button" className="relative flex w-10 h-10 items-center justify-center p-2" variant="ghost">
              <span className="sr-only">Search</span>
              <Search className="w-6 h-6 text-black" />
            </Button>
          </div>
        </div>
      </header>

      <div
        id="main-content"
        className="flex w-full max-w-lg flex-1 flex-col items-start justify-start pt-12 text-left relative"
      >
        <div className="flex flex-col items-start justify-start px-6">
          <h1 className="text-2xl font-semibold leading-snug">
            아래 버튼을 눌러
            <br />
            새로운 약속을 잡아보세요
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">친구들에게 공유하고 함께 투표할 수 있어요</p>
        </div>

        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <Pencil className="h-10 w-10 text-primary" />
          </div>
          <div className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
            <Plus className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="fixed bottom-0 z-10 w-full bg-background p-4 flex justify-center max-w-lg">
          <Button
            className="w-full bg-primary text-primary-foreground"
            onClick={() => {
              navigate(`/promise/create`);
            }}
          >
            약속 만들기
          </Button>
        </div>
      </div>

      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-gray-100"></div>
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-white max-w-lg"></div>
      </div>
    </div>
  );
}
