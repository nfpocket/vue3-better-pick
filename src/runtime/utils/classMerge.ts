import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

const isObject = (obj: any): obj is Record<string, any> => typeof obj === "object" && obj !== null;
export const deepMerge = <T>(target: T, source: DeepPartial<T>): T => {
  const result = { ...target };

  for (const key in source) {
    if (isObject(source[key]) && isObject(result[key])) {
      result[key as keyof T] = deepMerge(result[key as keyof T], source[key] as DeepPartial<T[typeof key]>);
    } else {
      result[key as keyof T] = source[key] as T[keyof T];
    }
  }

  return result;
};
