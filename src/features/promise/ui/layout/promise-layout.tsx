import { Button } from "@/shared/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PromiseLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function PromiseLayout({ children, title = "약속잡기" }: PromiseLayoutProps) {
  const navigate = useNavigate();

  return (
    <div
      id="main-container"
      className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden"
    >
      <header id="main-header" className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="relative z-20 flex w-full max-w-lg flex-row items-center justify-between gap-4 transition-colors bg-white h-[52px] max-h-[52px] min-h-[52px] px-24">
          <div className="absolute bottom-0 left-3 top-0 flex flex-row items-center justify-center">
            <button onClick={() => navigate("/")} className="flex flex-1 items-center justify-center p-2">
              <span className="sr-only">Home</span>
              <img src="/logo.svg" width={64} height={64} alt="logo" className="object-cover" />
            </button>
          </div>
          <div className="flex-1 truncate text-center text-sm transition-colors text-muted-foreground font-bold">
            {title}
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
        className="flex w-full max-w-lg flex-1 flex-col items-start justify-start pt-6 text-left relative px-4 pb-16"
      >
        {children}
      </div>

      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-gray-100" />
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-white max-w-lg" />
      </div>
    </div>
  );
}
