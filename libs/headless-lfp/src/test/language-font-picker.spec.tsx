import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";

import useLanguageFontPicker from "../language-font-picker";
import { FontFamilyLFF, FontLFF } from "../types";

// https://vitest.dev/api/vi.html#vi-mock
const mockLFF = vi.hoisted(() => ({
  error: undefined as string | undefined,
  findFonts: vi.fn(),
  finding: false,
  fonts: [] as FontLFF[],
  language: "",
}));
vi.mock("../language-font-finder", () => ({
  default: () => mockLFF,
}));

const mockFontId = "mockserif";
const mockFontFamily: FontFamilyLFF = {
  distributable: true,
  family: "Mock Serif",
  familyid: mockFontId,
};
const mockFont: FontLFF = {
  apiversion: "alpha",
  defaultfamily: [mockFontId],
  families: { [mockFontId]: mockFontFamily },
};
const mockFindFonts = (lang: string) => {
  mockLFF.language = lang;
  mockLFF.fonts = [mockFont];
  return [mockFont];
};

beforeAll(() => {
  mockLFF.findFonts.mockImplementation(mockFindFonts);
});

describe("useLanguageFontPicker", () => {
  describe("findFonts", () => {
    it("should use the (mocked) LFF", async () => {
      const { result } = renderHook(() => useLanguageFontPicker());

      expect(result.current.fonts).toHaveLength(0);
      expect(mockLFF.findFonts).not.toBeCalled();

      await act(async () => {
        await result.current.fetchFonts("ar");
      });

      expect(mockLFF.findFonts).toBeCalledTimes(1);
      expect(result.current.fonts).toHaveLength(1);
      expect(result.current.fonts[0].name).toEqual(mockFontFamily.family);
    });
  });
});
