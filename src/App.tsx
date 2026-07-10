import { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AchievementsPage from "./pages/AchievementsPage";
import DateGeneratorPage from "./pages/DateGeneratorPage";
import OurStarsPage from "./pages/OurStarsPage";
import RelationshipWrappedPage from "./pages/RelationshipWrappedPage";
import FutureBucketListPage from "./pages/FutureBucketListPage";
import EscapeRoomPage from "./pages/EscapeRoomPage";
import type { Page } from "./types/page";
import "./styles/globals.css";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  function go(p: Page) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>

      <Nav current={page} go={go} />

      <main>
        {page === "home" && <HomePage go={go} />}
        {page === "achievements" && <AchievementsPage />}
        {page === "date" && <DateGeneratorPage />}
        {page === "stars" && <OurStarsPage />}
        {page === "wrapped" && <RelationshipWrappedPage />}
        {page === "bucket" && <FutureBucketListPage />}
        {page === "escape" && <EscapeRoomPage />}
      </main>

      <Footer />
    </>
  );
}
