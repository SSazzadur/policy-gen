"use client";

import { StoreContext } from "@/hooks/StoreContext";
import { FC, ReactNode, useState } from "react";

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<StoreContextType>({});

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider };

