export type StepName = "계획" | "가능 날짜" | "불가능 날짜" | "결과 확인";

export interface FunnelContext {
  기간?: number;
  시간대?: string;
  마감시간?: string;
  가능한날짜?: number[];
  불가능한날짜?: number[];
}
