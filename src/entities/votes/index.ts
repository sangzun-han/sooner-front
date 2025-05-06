export interface Voter {
  id: string;
  name: string;
  profileImage: string;
}

export interface VoteStatus {
  available: Voter[];
  unavailable: Voter[];
  notVoted?: Voter[];
}

export type VoteStatusMap = {
  [timestamp: string]: VoteStatus;
};
