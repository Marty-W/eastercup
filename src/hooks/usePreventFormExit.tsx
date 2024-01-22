"use client";
import { useEffect } from "react";

const usePreventFormExit = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = "");
    };
    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: true,
    });
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
};

export { usePreventFormExit };
