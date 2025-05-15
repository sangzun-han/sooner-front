import { api } from "@/shared/api";
import { CreatePromisePayload, CreatePromiseResponse } from "../types/promise.types";

export const createPromise = async (data: CreatePromisePayload): Promise<CreatePromiseResponse> => {
  return api
    .post("promise/create", {
      json: data,
    })
    .json<CreatePromiseResponse>();
};
