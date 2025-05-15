import { getPromiseDetail } from "./get";
import { PromiseDetailResponse } from "../types/promise.types";

export const queryKeys = {
  promiseDetail: (id: number) => ["@promise-detail", id] as const,
};

export const queryOptions = {
  promiseDetail: (id: number) => ({
    queryKey: queryKeys.promiseDetail(id),
    queryFn: (): Promise<PromiseDetailResponse> => getPromiseDetail(id),
    staleTime: 5 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    enabled: !!id,
  }),
};
