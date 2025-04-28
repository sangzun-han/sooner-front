import HomePage from "@/pages/home/home-page";
import PromisePage from "@/pages/promise/promise-page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/promise" element={<PromisePage />} />
      </Routes>
    </BrowserRouter>
  );
}
