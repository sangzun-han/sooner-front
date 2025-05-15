import HomePage from "@/pages/home";
import PromisePage from "@/pages/promise";
import PromiseDetailPage from "@/pages/promise/detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/promise" element={<PromisePage />} />
        <Route path="/promise/:id" element={<PromiseDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
