import { Button } from "@/shared/components/ui/button";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function PromiseCreatePage() {
  const navigate = useNavigate();

  return (
    <div id="main-container" className="flex min-h-screen w-full flex-col items-center justify-start">
      <header id="main-header" className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="relative z-20 flex w-full max-w-lg flex-row items-center justify-between gap-4 transition-colors bg-white h-[52px] max-h-[52px] min-h-[52px] px-24">
          <div className="absolute bottom-0 left-3 top-0 flex flex-row items-center justify-center">
            <Link target="_self" to="/" className="flex flex-1 items-center justify-center p-2">
              <span className="sr-only">Home</span>
              <img src="/logo.svg" width={52} height={52} alt="sonner-icon" className="object-cover" />
            </Link>
          </div>
          <div className="flex-1 truncate text-center text-sm transition-colors text-muted-foreground font-bold">
            약속 만들기
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
        className="flex w-full max-w-lg flex-1 flex-col items-start justify-start pt-6 text-left relative"
      >
        <div className="flex flex-col w-full gap-10 px-6 pb-32">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-xl font-bold leading-snug">
              사람들과 약속잡을
              <br />
              대략적인 정보를 알려주세요
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">최대 12명까지 참여할 수 있어요</p>
          </div>

          <section className="flex flex-col gap-4">
            <h2 className="text-md font-semibold">약속잡을 기간</h2>
            <div className="grid grid-cols-2 [@media(min-width:512px)]:grid-cols-4 gap-2 w-full">
              <Button variant="outline" className="w-full">
                7일 안에
              </Button>
              <Button variant="outline" className="w-full bg-primary text-white">
                14일 안에
              </Button>
              <Button variant="outline" className="w-full">
                1달 안에
              </Button>
              <Button variant="outline" className="w-full">
                2달 안에
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">3/6(목)부터 3/20(목) 사이에 약속을 잡아봐요</p>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-md font-semibold">만나는 시간대</h2>
            <div className="grid grid-cols-3 gap-4 w-full place-items-center">
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center gap-1 rounded-full
             w-20 h-20 [@media(min-width:512px)]:w-24 [@media(min-width:512px)]:h-24"
              >
                <span className="text-lg">🌤️</span>
                <span className="text-xs">아침</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center gap-1 rounded-full
             w-20 h-20 [@media(min-width:512px)]:w-24 [@media(min-width:512px)]:h-24"
              >
                <span className="text-lg">☀️</span>
                <span className="text-xs">낮</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center gap-1 rounded-full
             w-20 h-20 [@media(min-width:512px)]:w-24 [@media(min-width:512px)]:h-24"
              >
                <span className="text-lg">🌙</span>
                <span className="text-xs">저녁</span>
              </Button>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-md font-semibold">투표 마감 시간</h2>
            <div className="grid grid-cols-2 [@media(min-width:512px)]:grid-cols-4 gap-2 w-full">
              <Button variant="outline" className="w-full">
                6시간 안에
              </Button>
              <Button variant="outline" className="w-full bg-primary text-white">
                오늘 안에
              </Button>
              <Button variant="outline" className="w-full">
                내일 안에
              </Button>
              <Button variant="outline" className="w-full">
                모레 안에
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">3/6(목)부터 3/20(목) 사이에 약속을 잡아봐요</p>
          </section>
        </div>
      </div>

      <div className="fixed bottom-0 z-10 w-full bg-background p-4 flex justify-center max-w-lg">
        <Button
          className="w-full bg-primary text-primary-foreground"
          onClick={() => {
            navigate(`/promise/create2`);
          }}
        >
          다음
        </Button>
      </div>

      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-gray-100"></div>
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-white max-w-lg"></div>
      </div>
    </div>
  );
}
