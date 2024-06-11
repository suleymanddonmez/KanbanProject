"use client";

import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Context } from "./contextProvider";

interface LastVisitedPageType {
  pageTitle: string;
  pathname: string;
}

const maxSavedPages = 10;

function RouterListener() {
  const context = useContext(Context);
  const { title } = context;

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    addThisPageInLastVisitedPages();
  }, [pathname, title]);

  const getLastVisitedPages = () => {
    let savedInfoString = localStorage.getItem("lastVisitedPages");
    let lastVisitedPages: LastVisitedPageType[] = [];
    if (savedInfoString) {
      try {
        lastVisitedPages = JSON.parse(savedInfoString);
      } catch {
        lastVisitedPages = [];
      }
    }
    return lastVisitedPages;
  };

  const setLastVisitedPages = (lastVisitedPages: LastVisitedPageType[]) => {
    localStorage.setItem("lastVisitedPages", JSON.stringify(lastVisitedPages));
  };

  const addThisPageInLastVisitedPages = () => {
    const pageInfo: LastVisitedPageType = {
      pageTitle: title || document.title,
      pathname: pathname,
    };
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
  };

  const lastVisitedPages = getLastVisitedPages().reverse();

  return (
    <>
      {lastVisitedPages && (
        <div className="flex overflow-hidden gap-3 fixed bottom-0 bg-slate-600 w-full">
          {lastVisitedPages.map((lastPage, index) => (
            <button key={index} className="font-bold p-2 hover:bg-slate-500 transition-all" onClick={() => router.push(lastPage.pathname)}>
              {lastPage.pageTitle}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default RouterListener;
