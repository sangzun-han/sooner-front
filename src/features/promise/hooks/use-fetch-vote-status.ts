import { useState } from "react";
import { voteStatusMock } from "../mock";
import { VoteStatusMap } from "@/entities/votes";

export const useFetchVoteStatus = () => {
  const [voteStatusMap, setVoteStatusMap] = useState<VoteStatusMap | null>(null);

  const fetchVoteStatus = async (context: {
    period?: number;
    timeRange?: string;
    deadline?: string;
    availableDates?: number[];
    unavailableDates?: number[];
  }): Promise<void> => {
    console.log("요청 context 확인용:", context);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // 임시 목데이터 세팅
    setVoteStatusMap(voteStatusMock);
  };
  return { voteStatusMap, fetchVoteStatus };
};
