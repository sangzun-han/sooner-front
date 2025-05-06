import { VoteStatusMap } from "@/entities/votes";

export const voteStatusMock: VoteStatusMap = {
  [new Date("2025-05-06").getTime().toString()]: {
    available: [
      { id: "u1", name: "철수", profileImage: "/avatars/chulsoo.png" },
      { id: "u2", name: "영희", profileImage: "/avatars/younghee.png" },
    ],
    unavailable: [{ id: "u3", name: "민수", profileImage: "/avatars/minsoo.png" }],
    notVoted: [{ id: "u4", name: "지수", profileImage: "/avatars/jisoo.png" }],
  },
  [new Date("2025-05-07").getTime().toString()]: {
    available: [],
    unavailable: [],
    notVoted: [
      { id: "u1", name: "철수", profileImage: "/avatars/chulsoo.png" },
      { id: "u2", name: "영희", profileImage: "/avatars/younghee.png" },
      { id: "u3", name: "민수", profileImage: "/avatars/minsoo.png" },
      { id: "u4", name: "지수", profileImage: "/avatars/jisoo.png" },
      { id: "u5", name: "지수", profileImage: "/avatars/jisoo.png" },
    ],
  },
  [new Date("2025-05-08").getTime().toString()]: {
    available: [
      { id: "u1", name: "철수", profileImage: "/avatars/chulsoo.png" },
      { id: "u2", name: "영희", profileImage: "/avatars/younghee.png" },
      { id: "u3", name: "민수", profileImage: "/avatars/minsoo.png" },
      { id: "u4", name: "지수", profileImage: "/avatars/jisoo.png" },
      { id: "u5", name: "지수", profileImage: "/avatars/jisoo.png" },
      { id: "u6", name: "지수", profileImage: "/avatars/jisoo.png" },
      { id: "u7", name: "지수", profileImage: "/avatars/jisoo.png" },
      { id: "8", name: "지수", profileImage: "/avatars/jisoo.png" },
    ],
    unavailable: [],
  },
  [new Date("2025-05-09").getTime().toString()]: {
    available: [],
    unavailable: [{ id: "u1", name: "철수", profileImage: "/avatars/chulsoo.png" }],
    notVoted: [
      { id: "u2", name: "영희", profileImage: "/avatars/younghee.png" },
      { id: "u3", name: "민수", profileImage: "/avatars/minsoo.png" },
      { id: "u4", name: "지수", profileImage: "/avatars/jisoo.png" },
    ],
  },
  [new Date("2025-05-10").getTime().toString()]: {
    available: [{ id: "u3", name: "민수", profileImage: "/avatars/minsoo.png" }],
    unavailable: [],
    notVoted: [
      { id: "u1", name: "철수", profileImage: "/avatars/chulsoo.png" },
      { id: "u2", name: "영희", profileImage: "/avatars/younghee.png" },
      { id: "u4", name: "지수", profileImage: "/avatars/jisoo.png" },
    ],
  },
  [new Date("2025-05-11").getTime().toString()]: {
    available: [],
    unavailable: [],
    notVoted: [],
  },
  [new Date("2025-05-12").getTime().toString()]: {
    available: [{ id: "u4", name: "지수", profileImage: "/avatars/jisoo.png" }],
    unavailable: [{ id: "u2", name: "영희", profileImage: "/avatars/younghee.png" }],
    notVoted: [
      { id: "u1", name: "철수", profileImage: "/avatars/chulsoo.png" },
      { id: "u3", name: "민수", profileImage: "/avatars/minsoo.png" },
    ],
  },
};
