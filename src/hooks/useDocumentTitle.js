/*
 * src/hooks/useDocumentTitle.js
 * Sets the browser tab title per page. Without this every route showed
 * the same static title from index.html -- tabs, browser history, and
 * bookmarks couldn't tell pages apart.
 * Connects to: src/pages/*
 * Created: 2026-07-07
 */

import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
