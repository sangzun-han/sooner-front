import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePromise } from "@/entities/promise/api";
import { CreatePromisePayload } from "@/entities/promise/types/promise.types";

interface PromiseCreateProps {
  defaultValues: {
    period?: string;
    timeRange?: string;
    deadline?: string;
    availableDates?: number[];
    unavailableDates?: number[];
  };
}

export default function PromiseCreate({ defaultValues }: PromiseCreateProps) {
  const navigate = useNavigate();
  const { mutate: createPromise, isPending, isError, isSuccess, error, data } = useCreatePromise();

  const payload: CreatePromisePayload = {
    period: defaultValues.period ?? "ONE_WEEK",
    timeRange: defaultValues.timeRange ?? "MORNING",
    deadline: defaultValues.deadline ?? "2025-01-01",
    availableDates: defaultValues.availableDates ?? [],
    unavailableDates: defaultValues.unavailableDates ?? [],
  };

  useEffect(() => {
    createPromise(payload);
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      navigate(`/promise/${data.id}`);
    }
  }, [isSuccess, data, navigate]);

  if (isPending) {
    return <div className="text-center mt-10">⏳ 약속을 생성 중입니다...</div>;
  }

  if (isError) {
    console.error("❌ 약속 생성 중 에러 발생:", error);
    return <div className="text-center mt-10">⚠️ 약속 생성에 실패했습니다. 다시 시도해주세요.</div>;
  }

  return null;
}
