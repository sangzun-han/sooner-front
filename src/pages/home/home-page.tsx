import { Button } from "@/shared/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted flex justify-center">
      <div className="max-w-limit min-h-screen bg-background relative flex flex-col">
        <div className="p-4 flex justify-end">
          <Button variant={"link"}>
            <MenuIcon className="w-6 h-6 text-foreground" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
          <div className="mt-10">
            <p className="text-muted-foreground text-xl mb-3">날짜 정하다 지치지 말고</p>
            <p className="text-primary text-3xl font-medium">약속잡기</p>
          </div>

          <div className="my-8">
            <HandIcon />
          </div>

          <div className="w-full mt-auto mb-20">
            <button className="w-full bg-yellow-300 text-primaryForeground rounded-md py-3 flex justify-center items-center gap-2 mb-4">
              <ChatIcon />
              <span className="font-medium">카카오 로그인</span>
            </button>

            <p className="text-sm text-mutedForeground mt-4">첫 로그인시 계정이 자동으로 생성됩니다.</p>
            <p className="text-sm text-mutedForeground">
              <a href="#" className="underline">
                이용약관
              </a>
              과{" "}
              <a href="#" className="underline">
                개인정보 처리방침
              </a>
              에 동의하는 것으로 간주됩니다.
            </p>
          </div>
        </div>

        {/* 오른쪽 중간 점 */}
        <div className="absolute right-16 top-1/2 w-3 h-3 bg-border rounded-full"></div>
      </div>
    </div>
  );
}

const HandIcon = () => {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.8">
        <path d="M60 30C55 40 45 45 35 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M70 25C75 35 85 38 95 33" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M75 15L80 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M60 60C60 60 55 45 65 40C75 35 80 45 75 55C70 65 60 70 55 80C50 90 50 100 60 105C70 110 85 105 85 90C85 75 85 60 85 60C85 60 85 50 95 50C105 50 105 60 105 65C105 70 105 80 95 80"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

const ChatIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 11.3807 2.86367 12.6751 3.5 13.7918L2.85355 17.1464C2.74145 17.6251 3.1749 18.0585 3.65355 17.9464L7.20815 17.3C8.32486 17.9363 9.61929 18.3 11 18.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
