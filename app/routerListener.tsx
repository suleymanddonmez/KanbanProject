"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Context } from "./contextProvider";

interface LastVisitedPageType {
  pageTitle: string;
  pathname: string;
}

const maxSavedPages = 10;

function RouterListener() {
  const [recentlyVisitedPages, setRecentlyVisitedPages] = useState<LastVisitedPageType[]>([]);
  const context = useContext(Context);
  const { title } = context;

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setRecentlyVisitedPages(getLastVisitedPages().reverse());
  }, [pathname]);

  useEffect(() => {
    addThisPageInLastVisitedPages?.();
  }, [title]);

  const getLastVisitedPages = () => {
    let lastVisitedPages: LastVisitedPageType[] = [];
    if (typeof window !== "undefined") {
      let savedInfoString = localStorage.getItem("lastVisitedPages");
      if (savedInfoString) {
        try {
          lastVisitedPages = JSON.parse(savedInfoString);
        } catch {
          lastVisitedPages = [];
        }
      }
    }
    return lastVisitedPages;
  };

  const setLastVisitedPages = (lastVisitedPages: LastVisitedPageType[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastVisitedPages", JSON.stringify(lastVisitedPages));
    }
  };

  const addThisPageInLastVisitedPages = () => {
    const pageInfo: LastVisitedPageType = {
      pageTitle: title,
      pathname: pathname,
    };
    if (pageInfo.pageTitle) {
      let lastVisitedPages = getLastVisitedPages();
      // control if already exist
      let existRecord = lastVisitedPages.find((lastPage) => lastPage.pathname == pageInfo.pathname);
      if (existRecord) {
        let index = lastVisitedPages.indexOf(existRecord);
        lastVisitedPages.splice(index, 1);
      }

      lastVisitedPages.push(pageInfo);
      if (lastVisitedPages.length > maxSavedPages) {
        lastVisitedPages = lastVisitedPages.slice(0, maxSavedPages);
      }
      setLastVisitedPages(lastVisitedPages);
    }
  };

  return (
    <>
      <div className="flex overflow-hidden gap-3 fixed left-0 bottom-0 bg-slate-600 w-full">
        {recentlyVisitedPages.length > 0 && <div className="font-bold p-2">Recently Visited Pages :</div>}
        {recentlyVisitedPages.map((lastPage, index) => (
          <button key={index} className="font-medium p-2 hover:bg-slate-500 transition-all" onClick={() => router.push(lastPage.pathname)}>
            {lastPage.pageTitle}
          </button>
        ))}
      </div>
    </>
  );
}

export default RouterListener;
