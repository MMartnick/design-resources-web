"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "designcurrent-saved";

function getSnapshot(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
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
  const savedIds = useSyncExternalStore(subscribe, getSnapshot, () => []);

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
