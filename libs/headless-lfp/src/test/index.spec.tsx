import { act, renderHook } from "@testing-library/react";
//import { vi } from 'vitest'

import useLanguageFontPicker from "../index";

describe("useLanguageFontPicker", () => {
  it("should render successfully", async () => {
    const { result } = renderHook(() => useLanguageFontPicker());

    expect(result.current.fonts).toHaveLength(0);

    await act(async () => {
      await result.current.fetchFonts("ar");
    });

    // ToDo: Mock out useLanguageFontFinder
    // https://vitest.dev/guide/mocking.html
    expect(result.current.fonts).toHaveLength(0);
  });
});
