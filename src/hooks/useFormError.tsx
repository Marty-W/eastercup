"use client";
import React, { createContext, useContext, useState } from "react";

type FormErrorContext = {
  error: string | null;
  setError: (error: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const FormErrorContext = createContext<FormErrorContext | null>(null);

interface Props {
  children: React.ReactNode;
}

export const FormErrorProvider = ({ children }: Props) => {
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const value = {
    error,
    setError,
    loading,
    setLoading,
  };

  return (
    <FormErrorContext.Provider value={value}>
      {children}
    </FormErrorContext.Provider>
  );
};

export const useFormError = () => {
  const formErrorContext = useContext(FormErrorContext);

  if (!formErrorContext) {
    throw new Error(
      "formErrorContext has to be used within <FormErrorContext.Provider>",
    );
  }

  return formErrorContext;
};
