"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "designcurrent-saved";

/** Stable empty array — reused on server and when localStorage is empty. */
const EMPTY: string[] = [];

/** Cache the last parsed value so getSnapshot returns a stable reference. */
let cachedRaw: string | null = null;
let cachedParsed: string[] = EMPTY;

function getSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY;
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

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  // Custom event for same-tab updates
  window.addEventListener("saved-changed", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("saved-changed", callback);
  };
}

function saveTo(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("saved-changed"));
}

export function useSaved(sourceId?: string) {
  const savedIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isSaved = sourceId ? savedIds.includes(sourceId) : false;

  const toggle = useCallback(() => {
    if (!sourceId) return;
    const current = getSnapshot();
    if (current.includes(sourceId)) {
      saveTo(current.filter((id) => id !== sourceId));
    } else {
      saveTo([...current, sourceId]);
    }
  }, [sourceId]);

  const addSaved = useCallback((id: string) => {
    const current = getSnapshot();
    if (!current.includes(id)) {
      saveTo([...current, id]);
    }
  }, []);

  const removeSaved = useCallback((id: string) => {
    const current = getSnapshot();
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
