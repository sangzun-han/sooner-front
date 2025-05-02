import { Button } from "@/shared/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
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

          <div className="w-full mt-auto mb-20">
            <button
              className="w-full bg-yellow-300 text-primaryForeground rounded-md py-3 flex justify-center items-center gap-2 mb-4"
              onClick={() => navigate("/promise")}
            >
              <span className="font-medium">카카오 로그인</span>
            </button>

            <p className="text-sm text-mutedForeground mt-4">첫 로그인시 계정이 자동으로 생성됩니다.</p>
            <p className="text-sm text-mutedForeground">
              <a href="#" className="underline">
                이용약관
              </a>
              과
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
