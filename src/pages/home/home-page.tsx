import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh space-y-6">
      <h1 className="text-2xl font-bold">날짜 정하다 지치지 말고</h1>
      <h2 className="text-4xl font-bold text-green-400">약속잡기</h2>
      <Link to="/appointment" className="px-6 py-3 bg-green-400 text-white rounded-md hover:bg-green-500 transition">
        약속 잡으러 가기
      </Link>
    </div>
  );
}
