"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "designcurrent-saved";

/** Stable empty array — reused on server and when localStorage is empty. */
const EMPTY: string[] = [];

/** Cache the last parsed value so getSnapshot returns a stable reference. */
let cachedRaw: string | null = null;
let cachedParsed: string[] = EMPTY;

function readLocalStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedParsed;
    cachedRaw = raw;
    cachedParsed = raw ? JSON.parse(raw) : EMPTY;
    return cachedParsed;
  } catch {
    return EMPTY;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("saved-changed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("saved-changed", callback);
  };
}

function saveTo(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  // Update cache immediately so getSnapshot returns the new value
  cachedRaw = JSON.stringify(ids);
  cachedParsed = ids;
  window.dispatchEvent(new Event("saved-changed"));
}

export function useSaved(sourceId?: string) {
  // Defer to client state after mount to avoid hydration mismatches.
  // Server-rendered HTML always shows "not saved".
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const externalIds = useSyncExternalStore(
    subscribe,
    readLocalStorage,
    () => EMPTY,
  );

  // Before mount, always return EMPTY to match SSR output
  const savedIds = mounted ? externalIds : EMPTY;
  const isSaved = sourceId ? savedIds.includes(sourceId) : false;

  const toggle = useCallback(() => {
    if (!sourceId) return;
    const current = readLocalStorage();
    if (current.includes(sourceId)) {
      saveTo(current.filter((id) => id !== sourceId));
    } else {
      saveTo([...current, sourceId]);
    }
  }, [sourceId]);

  const addSaved = useCallback((id: string) => {
    const current = readLocalStorage();
    if (!current.includes(id)) {
      saveTo([...current, id]);
    }
  }, []);

  const removeSaved = useCallback((id: string) => {
    const current = readLocalStorage();
    saveTo(current.filter((i) => i !== id));
  }, []);

  return {
    savedIds,
    isSaved,
    toggle,
    addSaved,
    removeSaved,
  };
}
