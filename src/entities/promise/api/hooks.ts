import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "./queries";

export const usePromiseDetail = (id: number) => {
  return useSuspenseQuery(queryOptions.promiseDetail(id));
};
