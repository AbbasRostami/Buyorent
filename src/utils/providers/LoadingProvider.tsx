"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MotionDiv } from "@/utils/providers/MotionWrapper";
import Image from "next/image";
import LoadingIM from "./../../assets/BUTORENT.png";
const LoadingContext = createContext<{
  setIsLoading: (loading: boolean) => void;
}>({
  setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {children}
      {isLoading && (
        <MotionDiv
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999] flex items-center justify-center"
        >
          <Image
            src={LoadingIM}
            alt="loading"
            className="opacity-50 w-[250px] h-auto"
          />
        </MotionDiv>
      )}
    </LoadingContext.Provider>
  );
}
