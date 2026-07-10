import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import DateGeneratorPage from "./pages/DateGeneratorPage";
import OurStarsPage from "./pages/OurStarsPage";
import RelationshipWrappedPage from "./pages/RelationshipWrappedPage";
import FutureBucketListPage from "./pages/FutureBucketListPage";
import LoveNotesPage from "./pages/LoveNotesPage";

import type { Page } from "./types/page";

const PAGE_ROUTES: Record<Page, string> = {
  home: "/",
  date: "/date",
  stars: "/stars",
  wrapped: "/wrapped",
  bucket: "/bucket",
  love: "/love",
};

const ROUTE_PAGES: Record<string, Page> = Object.entries(PAGE_ROUTES).reduce(
  (acc, [page, route]) => {
    acc[route] = page as Page;
    return acc;
  },
  {} as Record<string, Page>
);

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const page = ROUTE_PAGES[currentPath] || "home";

  useEffect(() => {
    if (!ROUTE_PAGES[currentPath]) {
      navigate("/", { replace: true });
    }
  }, [currentPath, navigate]);

  function go(pageToVisit: Page) {
    const route = PAGE_ROUTES[pageToVisit];
    navigate(route);

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