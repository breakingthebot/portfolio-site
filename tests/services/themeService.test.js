/*
 * tests/services/themeService.test.js
 * Verifies theme flip/resolve/persist logic.
 * Connects to: src/services/themeService.js
 * Created: 2026-07-07
 */

import { describe, expect, it, vi } from "vitest";

import {
  applyTheme,
  getNextTheme,
  resolveInitialTheme,
  storeTheme,
  THEME_STORAGE_KEY,
} from "../../src/services/themeService.js";

function mockStorage(initial = {}) {
  const store = { ...initial };
  return {
    getItem: vi.fn((key) => (key in store ? store[key] : null)),
    setItem: vi.fn((key, value) => {
      store[key] = value;
    }),
  };
}

describe("getNextTheme", () => {
  it("flips dark to light", () => {
    expect(getNextTheme("dark")).toBe("light");
  });

  it("flips light to dark", () => {
    expect(getNextTheme("light")).toBe("dark");
  });
});

describe("resolveInitialTheme", () => {
  it("returns the stored theme when one exists, regardless of system preference", () => {
    const storage = mockStorage({ [THEME_STORAGE_KEY]: "light" });

    expect(resolveInitialTheme(storage, true)).toBe("light");
  });

  it("falls back to dark when nothing is stored and the system prefers dark", () => {
    const storage = mockStorage();

    expect(resolveInitialTheme(storage, true)).toBe("dark");
  });

  it("falls back to light when nothing is stored and the system prefers light", () => {
    const storage = mockStorage();

    expect(resolveInitialTheme(storage, false)).toBe("light");
  });

  it("ignores a corrupted/unexpected stored value and falls back to system preference", () => {
    const storage = mockStorage({ [THEME_STORAGE_KEY]: "purple" });

    expect(resolveInitialTheme(storage, true)).toBe("dark");
  });
});

describe("storeTheme", () => {
  it("writes the theme under the expected key", () => {
    const storage = mockStorage();

    storeTheme("dark", storage);

    expect(storage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, "dark");
  });
});

describe("applyTheme", () => {
  it("sets the data-theme attribute on the document element", () => {
    const setAttribute = vi.fn();
    const doc = { documentElement: { setAttribute } };

    applyTheme("dark", doc);

    expect(setAttribute).toHaveBeenCalledWith("data-theme", "dark");
  });
});
