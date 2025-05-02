import { Button } from "@/shared/components/ui/button";
import { Search } from "lucide-react";
import { useFunnel } from "@/features/funnel/hooks/use-funnel";
import FunnelProvider from "@/features/funnel/ui/funnel-provider";
import FunnelStep from "@/features/funnel/ui/funnel-step";
import AvailableDateSelect from "@/features/promise/ui/steps/available-date-select";
import PlanSetting from "@/features/promise/ui/steps/plan-setting";
import Funnel from "@/features/funnel/ui/funnel";
import { useNavigate } from "react-router-dom";

export default function PromiseCreatePage() {
  const navigate = useNavigate();
  const { step, context, push, back, direction, prevStep } = useFunnel();

  return (
    <div id="main-container" className="flex min-h-screen w-full flex-col items-center justify-start">
      <header id="main-header" className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
        <div className="relative z-20 flex w-full max-w-lg flex-row items-center justify-between gap-4 transition-colors bg-white h-[52px] max-h-[52px] min-h-[52px] px-24">
          <div className="absolute bottom-0 left-3 top-0 flex flex-row items-center justify-center">
            <button onClick={() => navigate("/")} className="flex flex-1 items-center justify-center p-2">
              <span className="sr-only">Home</span>
              <img src="/logo.svg" width={52} height={52} alt="sonner-icon" className="object-cover" />
            </button>
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
        className="flex w-full max-w-lg flex-1 flex-col items-start justify-start pt-6 text-left relative"
      >
        <FunnelProvider currentStep={step} direction={direction} prevStep={prevStep}>
          <div className="relative w-full max-w-lg flex-1 pt-6 px-4 pb-20">
            <Funnel>
              <FunnelStep name="계획">
                <PlanSetting onNext={(next) => push("가능 날짜", next)} defaultValues={context} />
              </FunnelStep>
              <FunnelStep name="가능 날짜">
                <AvailableDateSelect
                  selectedDates={context.가능한날짜 || []}
                  onNext={(dates) => {
                    push("불가능 날짜", { 가능한날짜: dates });
                  }}
                  onBack={back}
                />
              </FunnelStep>
            </Funnel>
          </div>
        </FunnelProvider>
      </div>
      <div id="scroll-background" className="pointer-events-none -z-50 flex flex-col items-center">
        <div className="fixed inset-0 -z-50 bg-gray-100"></div>
        <div className="fixed bottom-0 top-0 -z-40 w-full bg-white max-w-lg"></div>
      </div>
    </div>
  );
}
