import { api } from "@/shared/api";
import { PromiseDetailResponse } from "../types/promise.types";

export const getPromiseDetail = async (id: number): Promise<PromiseDetailResponse> => {
  return await api.get(`promise/${id}`).json<PromiseDetailResponse>();
};
