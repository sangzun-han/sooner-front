import { useState } from "react";
import { voteStatusMock } from "../mock";
import { VoteStatusMap } from "@/entities/votes";

export const useFetchVoteStatus = () => {
  const [voteStatusMap, setVoteStatusMap] = useState<VoteStatusMap | null>(null);

  const fetchVoteStatus = async (): Promise<void> => {
    // TODO : 이후에 실제 API 요청으로.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setVoteStatusMap(voteStatusMock);
  };

  return { voteStatusMap, fetchVoteStatus };
};
