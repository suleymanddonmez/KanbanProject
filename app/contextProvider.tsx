"use client";
import React, { createContext, useEffect, useState } from "react";

const initialContextValue = {
  title: "Kanban Project",
  updateTitle: (title: string) => {},
};

export const Context = createContext(initialContextValue);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState(initialContextValue.title);

  useEffect(() => {
    document.title = title || initialContextValue.title;
  }, [title]);

  return (
    <Context.Provider
      value={{
        title,
        updateTitle: setTitle,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
