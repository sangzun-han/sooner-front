import ky from "ky";

export const api = ky.create({
  prefixUrl: "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  hooks: {
    beforeRequest: [
      (request) => {
        console.log(`🌐 API 요청: ${request.url}`);
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        if (response.status === 401) {
          console.error("인증 실패: 다시 로그인 필요");
        }
      },
    ],
  },
});
