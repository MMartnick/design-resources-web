"use client";

import { useMemo } from "react";
import Fuse, { type IFuseOptions, type FuseOptionKey } from "fuse.js";

/**
 * Generic fuzzy search hook powered by Fuse.js.
 * Returns the original list when query is empty.
 */
export function useFuseSearch<T>(
  items: T[],
  keys: FuseOptionKey<T>[],
  query: string,
  options?: Partial<IFuseOptions<T>>
): T[] {
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys,
        threshold: 0.35,
        ignoreLocation: true,
        ...options,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  );

  return useMemo(() => {
    if (!query.trim()) return items;
    return fuse.search(query).map((r) => r.item);
  }, [fuse, query, items]);
}
