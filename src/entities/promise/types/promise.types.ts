export interface VoteUser {
  id: string;
  name: string;
  profileImage: string;
}

export interface VoteStatus {
  available: VoteUser[];
  unavailable: VoteUser[];
  notVoted: VoteUser[];
}

export interface VoteStatusMap {
  [timestamp: string]: VoteStatus;
}

export interface CreatePromisePayload {
  period: string;
  timeRange: string;
  deadline: string;
  availableDates: number[];
  unavailableDates: number[];
}

export interface CreatePromiseResponse {
  id: number;
}

export interface PromiseDetailResponse {
  id: number;
  period: string;
  timeRange: string;
  deadline: string;
  createdAt: string;
  availableDates: string[];
  unavailableDates: string[];
  voteStatusMap: VoteStatusMap;
}
