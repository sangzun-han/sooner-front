import HomePage from "@/pages/home";
import PromisePage from "@/pages/promise";
import PromiseCreatePage from "@/pages/promise/create";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/promise" element={<PromisePage />} />
        <Route path="/promise/create" element={<PromiseCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
