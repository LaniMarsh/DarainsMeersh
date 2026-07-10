import { useState } from "react";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AchievementsPage from "./pages/AchievementsPage";
import DateGeneratorPage from "./pages/DateGeneratorPage";
import OurStarsPage from "./pages/OurStarsPage";
import RelationshipWrappedPage from "./pages/RelationshipWrappedPage";
import FutureBucketListPage from "./pages/FutureBucketListPage";
import LoveNotesPage from "./pages/LoveNotesPage";

import type { Page } from "./types/page";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  function go(pageToVisit: Page) {
    setPage(pageToVisit);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Nav current={page} go={go} />

      <main>
        {page === "home" && <HomePage go={go} />}

        {page === "date" && (
          <DateGeneratorPage />
        )}

        {page === "stars" && (
          <OurStarsPage />
        )}

        {page === "wrapped" && (
          <RelationshipWrappedPage />
        )}

        {page === "bucket" && (
          <FutureBucketListPage />
        )}

        {page === "love" && (
          <LoveNotesPage />
        )}
      </main>

      <Footer />
    </>
  );
}