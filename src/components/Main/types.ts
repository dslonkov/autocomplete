import React from "react";

export type MainProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export type CountryInfo = {
  name?: string;
  id?: number;
  population?: number;
  land_area?: number;
  density?: number;
  capital?: string;
  currency?: string;
  flag?: string;
};

export type DebouncedFunction<T extends (...args: any[]) => unknown> = {
  (...args: Parameters<T>): void;
};
