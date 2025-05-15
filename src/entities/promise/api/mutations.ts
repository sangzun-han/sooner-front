import { useMutation } from "@tanstack/react-query";
import { CreatePromisePayload, CreatePromiseResponse } from "@/entities/promise/types/promise.types";
import { createPromise } from "./create";

export const useCreatePromise = () => {
  return useMutation<CreatePromiseResponse, Error, CreatePromisePayload>({
    mutationFn: (data: CreatePromisePayload) => createPromise(data),
  });
};
